import { useState, useEffect, useRef, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Noise & terrain generation
// ─────────────────────────────────────────────────────────────────────────────
function createNoise(seed = 42) {
  const perm = new Uint8Array(512);
  const grad = [
    [1, 1], [-1, 1], [1, -1], [-1, -1],
    [1, 0], [-1, 0], [0, 1], [0, -1],
  ];
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = seed;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerp(a, b, t) { return a + t * (b - a); }
  function dot(g, x, y) { return g[0] * x + g[1] * y; }

  return function (x, y) {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x), yf = y - Math.floor(y);
    const u = fade(xf), v = fade(yf);
    const aa = perm[perm[X] + Y] & 7, ab = perm[perm[X] + Y + 1] & 7;
    const ba = perm[perm[X + 1] + Y] & 7, bb = perm[perm[X + 1] + Y + 1] & 7;
    return lerp(
      lerp(dot(grad[aa], xf, yf), dot(grad[ba], xf - 1, yf), u),
      lerp(dot(grad[ab], xf, yf - 1), dot(grad[bb], xf - 1, yf - 1), u),
      v
    );
  };
}

function fbm(noise, x, y, octaves = 5) {
  let val = 0, amp = 0.5, freq = 1;
  for (let i = 0; i < octaves; i++) {
    val += amp * noise(x * freq, y * freq);
    amp *= 0.5;
    freq *= 2.1;
  }
  return val;
}

// Bayer 4x4 ordered dithering
const BAYER4 = [
  [0, 8, 2, 10], [12, 4, 14, 6],
  [3, 11, 1, 9], [15, 7, 13, 5],
];

// ─────────────────────────────────────────────────────────────────────────────
// Footer data
// ─────────────────────────────────────────────────────────────────────────────
const FOOTER_COLUMNS = [
  {
    title: "Services",
    links: ["Trailhead", "Wayfinder", "Training", "Assessment"],
  },
  {
    title: "Company",
    links: ["About", "Team", "Changelog", "Careers"],
  },
  {
    title: "Community",
    links: ["GitHub", "Discord", "Twitter", "YouTube"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Case Studies", "Blog", "Contact"],
  },
];

const MONO = { fontFamily: '"Geist Mono", "SF Mono", "Fira Code", monospace' };
const SANS = { fontFamily: '"Geist Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' };

// ─────────────────────────────────────────────────────────────────────────────
// Animated dithered topo canvas — two-color dot style matching dither prototype
// ─────────────────────────────────────────────────────────────────────────────
function TopoCanvas({ dark, height = 750 }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const timeRef = useRef(0);
  const frameRef = useRef(null);
  const noiseRef = useRef(createNoise(42));

  // Palette: footer-dark base with cream dots dispersing upward
  const bg = "#262625";       // matches footer bg
  const fg = "#e8e0d0";       // cream dots
  const dotSize = 3;

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const w = Math.floor(rect.width);
    const h = height;

    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";

    const ctx = canvas.getContext("2d");
    const noise = noiseRef.current;
    const t = timeRef.current;

    const gridW = Math.floor(w / dotSize);
    const gridH = Math.floor(h / dotSize);

    // Generate topo elevation data
    const elevation = new Float32Array(gridW * gridH);
    let minE = Infinity, maxE = -Infinity;

    for (let gy = 0; gy < gridH; gy++) {
      for (let gx = 0; gx < gridW; gx++) {
        // Much lower frequency = broader, more readable landforms
        const nx = gx / gridW * 2.5 + t * 0.03 + 0.5;
        const ny = gy / gridH * 1.8 + t * 0.015 + 0.5;

        // Fewer octaves = smoother, less noisy terrain
        let e = fbm(noise, nx, ny, 3);

        // One broad ridge feature instead of detailed ones
        const ridge = noise(nx * 0.8 + 5, ny * 0.8 + 5);
        e += Math.abs(ridge) * 0.2;

        // Subtle breathing
        e += Math.sin(gx / gridW * 2.0 + t * 0.25) * 0.01;

        const idx = gy * gridW + gx;
        elevation[idx] = e;
        if (e < minE) minE = e;
        if (e > maxE) maxE = e;
      }
    }

    // Normalize to 0–1
    const range = maxE - minE || 1;
    for (let i = 0; i < elevation.length; i++) {
      elevation[i] = (elevation[i] - minE) / range;
    }

    // Detect contour lines — wider and fewer for readability
    const numContours = 8;
    const contourWidth = 0.018;
    const isContour = new Uint8Array(gridW * gridH);
    // Also detect "major" contours (every other line, thicker)
    const isMajorContour = new Uint8Array(gridW * gridH);
    for (let i = 0; i < elevation.length; i++) {
      const e = elevation[i];
      for (let c = 1; c < numContours; c++) {
        const level = c / numContours;
        if (Math.abs(e - level) < contourWidth) {
          isContour[i] = 1;
          if (c % 2 === 0) isMajorContour[i] = 1;
          break;
        }
      }
    }

    // Widen major contours by marking neighbors
    const majorExpanded = new Uint8Array(gridW * gridH);
    for (let gy = 0; gy < gridH; gy++) {
      for (let gx = 0; gx < gridW; gx++) {
        const idx = gy * gridW + gx;
        if (isMajorContour[idx]) {
          // Mark this pixel and its neighbors
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const ny2 = gy + dy, nx2 = gx + dx;
              if (ny2 >= 0 && ny2 < gridH && nx2 >= 0 && nx2 < gridW) {
                majorExpanded[ny2 * gridW + nx2] = 1;
              }
            }
          }
        }
      }
    }

    // Remap elevation to brightness for dithering
    // Use wider tonal steps so elevation bands are clearly distinct
    const brightness = new Float32Array(gridW * gridH);
    for (let i = 0; i < elevation.length; i++) {
      const e = elevation[i];
      // Quantize into broad bands for clear elevation shading
      // This creates distinct "zones" rather than smooth gradients
      const bands = 6;
      const banded = Math.floor(e * bands) / bands;
      // Blend between banded and smooth for a natural but readable result
      const blended = banded * 0.6 + e * 0.4;
      // Map to brightness range — higher elevation = lighter (more bg showing)
      brightness[i] = 0.3 + blended * 0.55;
    }

    // Fill background
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Draw dithered dots with vertical dispersion
    // Dense at bottom, particles scatter and thin out toward top
    ctx.fillStyle = fg;
    const gap = Math.max(1, Math.floor(dotSize * 0.2));
    const size = dotSize - gap;

    // Pre-compute a noise-driven dispersion mask for the ragged top edge
    // Use a separate noise read so it's independent of terrain
    const disperseNoise = createNoise(137);

    for (let gy = 0; gy < gridH; gy++) {
      for (let gx = 0; gx < gridW; gx++) {
        const idx = gy * gridW + gx;
        const val = brightness[idx];
        const contour = isContour[idx];
        const major = majorExpanded[idx];
        const threshold = (BAYER4[gy % 4][gx % 4] + 0.5) / 16;

        // ── Vertical dispersion ──
        // yNorm: 0 at top, 1 at bottom
        const yNorm = gy / gridH;

        // Remap so the taper only happens in the top ~25% of the canvas
        // Below that, everything is fully dense
        const taperStart = 0.25; // top 25% tapers, bottom 75% is solid
        let baseDensity;
        if (yNorm >= taperStart) {
          baseDensity = 1.0; // fully solid
        } else {
          // Smooth taper from 0 at top to 1 at taperStart
          const taperNorm = yNorm / taperStart;
          baseDensity = Math.pow(taperNorm, 1.5);
        }

        // Add noise to the edge to create ragged, organic dispersion
        const nx2 = gx / gridW * 8.0 + t * 0.05;
        const ny2 = gy / gridH * 6.0 + t * 0.03;
        const edgeNoise = disperseNoise(nx2, ny2) * 0.5 +
                          disperseNoise(nx2 * 2.5, ny2 * 2.5) * 0.25 +
                          disperseNoise(nx2 * 5.0, ny2 * 5.0) * 0.15;

        // Noise only affects the taper zone
        const noiseInfluence = yNorm < taperStart ? edgeNoise * 0.4 : 0;
        const survivalThreshold = baseDensity + noiseInfluence;

        const cutoff = 0.35;
        const survives = survivalThreshold > cutoff;

        if (!survives) continue;

        // Standard topo drawing logic
        let draw = false;

        if (major) {
          draw = true;
        } else if (contour) {
          draw = true;
        } else {
          draw = val < 1 - threshold;
        }

        if (draw) {
          const px = gx * dotSize + gap / 2;
          const py = gy * dotSize + gap / 2;
          ctx.fillRect(px, py, size, size);
        }
      }
    }
  }, [height]);

  useEffect(() => {
    let last = 0;
    const loop = (ts) => {
      const dt = last ? (ts - last) / 1000 : 0.016;
      last = ts;
      timeRef.current += dt;
      render();
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [render]);

  useEffect(() => {
    const onResize = () => render();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [render]);

  return (
    <div ref={containerRef} style={{ width: "100%", position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height, imageRendering: "pixelated" }}
      />
      {/* Overlay metadata — sits at the dense bottom portion */}
      <div style={{
        position: "absolute", bottom: 16, left: 0, right: 0,
        padding: "0 clamp(24px, 4vw, 64px)",
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        pointerEvents: "none",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ ...MONO, fontSize: 10, letterSpacing: "0.15em", color: "rgba(232,224,208,0.35)" }}>
            // TERRAIN_MAP_01
          </span>
          <span style={{ ...MONO, fontSize: 10, letterSpacing: "0.05em", color: "rgba(232,224,208,0.2)" }}>
            43.7615°N · 79.4111°W · elev. 0–1440m
          </span>
        </div>
        <span style={{ ...MONO, fontSize: 10, color: "rgba(232,224,208,0.15)" }}>
          v2.1.0
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main footer component
// ─────────────────────────────────────────────────────────────────────────────
export default function MraiFooter() {
  const [dark, setDark] = useState(true);
  const [email, setEmail] = useState("");

  // Page bg shifts, footer is always dark
  const pageBg = dark ? "#1A1A18" : "#FAF9F6";
  const footerBg = "#262625";
  const footerText = "#FFFFFF";
  const footerMuted = "rgba(255,255,255,0.5)";
  const footerDim = "rgba(255,255,255,0.3)";
  const footerBorder = "rgba(255,255,255,0.08)";
  const accent = "#3D7A41";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .mrai-footer-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          transition: background-color 0.4s ease;
        }

        /* ── Footer upper ── */
        .mrai-footer {
          background: ${footerBg};
          color: ${footerText};
          position: relative;
        }

        .mrai-footer-upper {
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px clamp(24px, 4vw, 64px) 64px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }

        @media (min-width: 768px) {
          .mrai-footer-upper {
            grid-template-columns: 1.1fr 1fr 1fr 1fr 1fr;
            gap: 32px;
          }
        }

        /* ── Newsletter column ── */
        .mrai-footer-newsletter h3 {
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 500;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }

        .mrai-footer-newsletter p {
          font-size: 14px;
          line-height: 1.6;
          color: ${footerMuted};
          margin-bottom: 24px;
        }

        .mrai-footer-input-wrap {
          display: flex;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid ${footerBorder};
          transition: border-color 0.2s ease;
        }

        .mrai-footer-input-wrap:focus-within {
          border-color: rgba(255,255,255,0.2);
        }

        .mrai-footer-input {
          flex: 1;
          background: rgba(255,255,255,0.04);
          border: none;
          outline: none;
          color: ${footerText};
          padding: 12px 16px;
          font-size: 14px;
          min-width: 0;
        }

        .mrai-footer-input::placeholder {
          color: ${footerDim};
        }

        .mrai-footer-submit {
          background: ${accent};
          color: white;
          border: none;
          padding: 12px 20px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s ease;
          white-space: nowrap;
        }

        .mrai-footer-submit:hover {
          background: #336737;
        }

        .mrai-footer-copyright {
          margin-top: 24px;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: ${footerDim};
        }

        /* ── Nav columns ── */
        .mrai-footer-col h4 {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 16px;
          color: ${footerText};
        }

        .mrai-footer-col a {
          display: block;
          font-size: 14px;
          color: ${footerMuted};
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.15s ease;
        }

        .mrai-footer-col a:hover {
          color: ${footerText};
        }

        /* ── Divider ── */
        .mrai-footer-divider {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(24px, 4vw, 64px);
        }

        .mrai-footer-divider-line {
          border: none;
          height: 1px;
          background: ${footerBorder};
        }

        /* ── Wordmark row ── */
        .mrai-footer-wordmark-row {
          max-width: 1280px;
          margin: 0 auto;
          padding: 32px clamp(24px, 4vw, 64px) 40px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .mrai-footer-wordmark {
          font-size: clamp(56px, 10vw, 140px);
          font-weight: 500;
          line-height: 0.85;
          letter-spacing: -0.03em;
          color: ${footerText};
        }

        .mrai-footer-meta {
          display: flex;
          gap: 24px;
          align-items: flex-end;
        }

        .mrai-footer-meta-item {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }

        /* ── Demo toggle (remove in prod) ── */
        .mrai-demo-toggle {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 100;
          background: transparent;
          border: 1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"};
          border-radius: 6px;
          padding: 6px 14px;
          color: ${dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"};
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s;
        }

        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <div className="mrai-footer-root" style={{ background: pageBg }}>
        {/* Demo theme toggle */}
        <button
          className="mrai-demo-toggle"
          style={MONO}
          onClick={() => setDark(!dark)}
        >
          [ {dark ? "light" : "dark"}_ ]
        </button>

        {/* Spacer to simulate page content above */}
        <div style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "120px clamp(24px, 4vw, 64px) 80px",
        }}>
          <div style={{
            ...MONO,
            fontSize: 12,
            letterSpacing: "0.15em",
            color: dark ? "rgba(236,236,234,0.3)" : "rgba(38,38,37,0.3)",
            marginBottom: 16,
          }}>
            <span style={{ color: dark ? "rgba(61,122,65,0.6)" : "#3D7A41" }}>//</span> PAGE_CONTENT
          </div>
          <p style={{
            ...SANS,
            fontSize: 20,
            color: dark ? "rgba(236,236,234,0.4)" : "rgba(38,38,37,0.4)",
            lineHeight: 1.6,
          }}>
            Scroll down to see the footer mockup →
          </p>
        </div>

        {/* ════════════════════════════════════════════ */}
        {/* FOOTER */}
        {/* ════════════════════════════════════════════ */}
        <footer className="mrai-footer">
          {/* Upper: newsletter + nav columns */}
          <div className="mrai-footer-upper">
            {/* Newsletter */}
            <div className="mrai-footer-newsletter">
              <h3 style={SANS}>
                MRAI
              </h3>
              <p style={SANS}>
                Sign up for dispatches on AI adoption, engineering culture, and what we're learning.
              </p>
              <div className="mrai-footer-input-wrap">
                <input
                  className="mrai-footer-input"
                  style={SANS}
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="mrai-footer-submit" style={MONO}>
                  Subscribe_
                </button>
              </div>
              <div className="mrai-footer-copyright" style={MONO}>
                © 2026 MANY ROADS AI. ALL RIGHTS RESERVED.
              </div>
            </div>

            {/* Nav columns */}
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="mrai-footer-col">
                <h4 style={SANS}>{col.title}</h4>
                {col.links.map((link) => (
                  <a key={link} href="#" style={MONO}>
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>

          {/* ── Animated topo map ── */}
          <TopoCanvas dark={dark} height={340} />
        </footer>
      </div>
    </>
  );
}
