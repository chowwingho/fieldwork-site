'use client'
import { useEffect, useRef, useCallback } from "react";

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

const BAYER4 = [
  [0, 8, 2, 10], [12, 4, 14, 6],
  [3, 11, 1, 9], [15, 7, 13, 5],
];

const MONO = { fontFamily: '"Geist Mono", "SF Mono", "Fira Code", "Fira Mono", monospace' };

// ─────────────────────────────────────────────────────────────────────────────
// Animated dithered topo canvas
// ─────────────────────────────────────────────────────────────────────────────
export default function TopoCanvas({ height = 750 }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const timeRef = useRef(0);
  const frameRef = useRef(null);
  const noiseRef = useRef(createNoise(42));

  const bg = "#262625";
  const fg = "#e8e0d0";
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
        const nx = gx / gridW * 2.5 + t * 0.03 + 0.5;
        const ny = gy / gridH * 1.8 + t * 0.015 + 0.5;

        let e = fbm(noise, nx, ny, 3);

        const ridge = noise(nx * 0.8 + 5, ny * 0.8 + 5);
        e += Math.abs(ridge) * 0.2;

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

    // Detect contour lines
    const numContours = 8;
    const contourWidth = 0.018;
    const isContour = new Uint8Array(gridW * gridH);
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

    // Remap elevation to brightness with banding
    const brightness = new Float32Array(gridW * gridH);
    for (let i = 0; i < elevation.length; i++) {
      const e = elevation[i];
      const bands = 6;
      const banded = Math.floor(e * bands) / bands;
      const blended = banded * 0.6 + e * 0.4;
      brightness[i] = 0.3 + blended * 0.55;
    }

    // Fill background
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Draw dithered dots with vertical dispersion
    ctx.fillStyle = fg;
    const gap = Math.max(1, Math.floor(dotSize * 0.2));
    const size = dotSize - gap;

    const disperseNoise = createNoise(137);

    for (let gy = 0; gy < gridH; gy++) {
      for (let gx = 0; gx < gridW; gx++) {
        const idx = gy * gridW + gx;
        const val = brightness[idx];
        const contour = isContour[idx];
        const major = majorExpanded[idx];
        const threshold = (BAYER4[gy % 4][gx % 4] + 0.5) / 16;

        // Vertical dispersion
        const yNorm = gy / gridH;
        const taperStart = 0.25;
        let baseDensity;
        if (yNorm >= taperStart) {
          baseDensity = 1.0;
        } else {
          const taperNorm = yNorm / taperStart;
          baseDensity = Math.pow(taperNorm, 1.5);
        }

        const nx2 = gx / gridW * 8.0 + t * 0.05;
        const ny2 = gy / gridH * 6.0 + t * 0.03;
        const edgeNoise = disperseNoise(nx2, ny2) * 0.5 +
                          disperseNoise(nx2 * 2.5, ny2 * 2.5) * 0.25 +
                          disperseNoise(nx2 * 5.0, ny2 * 5.0) * 0.15;

        const noiseInfluence = yNorm < taperStart ? edgeNoise * 0.4 : 0;
        const survivalThreshold = baseDensity + noiseInfluence;

        const cutoff = 0.35;
        const survives = survivalThreshold > cutoff;

        if (!survives) continue;

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
      {/* Overlay metadata */}
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
