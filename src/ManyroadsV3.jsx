'use client'
// Many Roads V2 — Site v1.7 — 2026-02-20
import { useState, useEffect, useRef, useCallback } from "react";
import CommandPalette from "./components/CommandPalette";
import MraiConsole from "./components/MraiConsole";
import Logo from "./components/Logo";

// =============================================================================
// ASSET URLS (Figma exports — valid for 7 days)
// Replace these with your own hosted images before deploying.
// =============================================================================
const ASSETS = {
  heroImage:
    "https://www.figma.com/api/mcp/asset/d4c83192-1c74-46c1-8238-16ba29de8baa",
  workThumbs: [
    "https://www.figma.com/api/mcp/asset/600d9b9b-2524-49de-8e3b-2943643e5575",
    "https://www.figma.com/api/mcp/asset/4f0857cd-4245-4e0e-a1df-e8600eb7bbcc",
    "https://www.figma.com/api/mcp/asset/c760e8c1-1e11-41e7-9182-17d430c90286",
    "https://www.figma.com/api/mcp/asset/ab159f51-9c23-41a4-979f-f08527c3f9b6",
    "https://www.figma.com/api/mcp/asset/c3186de3-ad97-496d-ae58-78c95dcd341f",
    "https://www.figma.com/api/mcp/asset/6a58b820-4fb8-454c-8748-b17fa67d449e",
  ],
};

// =============================================================================
// DATA
// =============================================================================
const STATS = [
  {
    value: "73%",
    label: "Unmet expectations",
    desc: "Of engineering teams report AI tool adoption hasn\u2019t met productivity expectations.",
  },
  {
    value: "6\u201312mo",
    label: "Delayed recognition",
    desc: "Typical time before engineering leaders realize AI tools are underperforming in legacy codebases.",
  },
  {
    value: "80/20",
    label: "The adoption gap",
    desc: "The gap between reported adoption rates and actual productive usage across engineering teams.",
  },
  {
    value: "0",
    label: "Pre-configured tools",
    desc: "Number of AI coding tools that ship configured for your codebase, your patterns, your workflows.",
  },
];

const SERVICES = [
  {
    num: "01",
    title: "The senior engineers opted out.",
    desc: "They tried the AI suggestions. Found them wrong more often than helpful for your specific codebase. Went back to how they worked before. Your adoption metrics say 80%. Reality says 20%.",
  },
  {
    num: "02",
    title: "The junior engineers over-trust.",
    desc: "They\u2019re accepting AI-generated code that looks correct, passes basic review, and quietly violates your architectural patterns. The tech debt is accumulating in ways that won\u2019t be visible for months.",
  },
  {
    num: "03",
    title: "The tools are still on factory defaults.",
    desc: "Nobody had time to configure them for your codebase, your naming conventions, your testing patterns, your deployment workflows. So the tools are guessing. They\u2019re guessing wrong.",
  },
  {
    num: "04",
    title: "Leadership is measuring the wrong things.",
    desc: "Seat activations. Suggestion acceptance rates. Lines of code generated. None of these correlate with cycle time, code quality, developer satisfaction, or sustainable velocity. But they make a nice dashboard.",
  },
];

const NAV_LINKS = ["--products", "--services", "--about", "--contact"];
const FOOTER_NAV = ["Trailhead", "Wayfinder", "Team", "Contact"];
const FOOTER_SOCIAL = ["Twitter", "Instagram", "YouTube"];

// =============================================================================
// FONT STYLES
// =============================================================================
const MONO = { fontFamily: '"Geist Mono", "SF Mono", "Fira Code", "Fira Mono", monospace' };

const ACCENT_OPTIONS = [
  { color: "#3D7A41", name: "Green" },
  { color: "#8A708A", name: "Mauve" },
  { color: "#4F769A", name: "Blue" },
  { color: "#C47030", name: "Orange" },
  { color: "#B8892A", name: "Amber" },
];

function darkenColor(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 0xFF) * 0.85);
  const g = Math.round(((n >> 8) & 0xFF) * 0.85);
  const b = Math.round((n & 0xFF) * 0.85);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// =============================================================================
// SHARED COMPONENTS
// =============================================================================
function SectionLabel({ children, align = "left" }) {
  const rendered = typeof children === "string" && children.startsWith("//")
    ? (<><span className="text-[var(--accent)]">//</span>{children.slice(2)}</>)
    : children;
  return (
    <span className={`text-base lg:text-lg font-medium tracking-normal ${align === "right" ? "text-right" : ""}`} style={{ ...MONO, color: "var(--mr-text-primary)" }}>
      {rendered}
    </span>
  );
}

function PrimaryButton({ children }) {
  return (
    <a
      href="#"
      className="group inline-flex items-center gap-2 mr-btn-primary px-4 py-2 rounded-lg text-lg font-medium w-fit"
      style={MONO}
    >
      <span>{children}</span>
    </a>
  );
}

function HeroButton() {
  return (
    <a
      href="#"
      className="inline-flex items-center text-left bg-[var(--accent)] text-white px-4 py-2 rounded-lg text-base sm:text-lg font-medium hover:bg-[var(--accent-hover)] transition-colors min-w-0"
      style={MONO}
    >
      See where you stand<span className="blink-cursor text-white">_</span>
    </a>
  );
}

// =============================================================================
// SECTIONS
// =============================================================================
function Navbar({ onOpenPalette, onOpenConsole }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  useEffect(() => {
    function handleResize() { if (window.innerWidth >= 768) setMenuOpen(false); }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50" style={{ background: "var(--mr-bg-page)" }} ref={menuRef}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex items-center justify-between h-[77px]">
        <Logo className="h-6 md:h-7 w-auto" style={{ color: "var(--mr-text-primary)" }} />
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-lg font-medium mr-link-nav"
                style={MONO}
              >
                {link}
              </a>
            ))}
            <button
              onClick={onOpenPalette}
              className="text-sm mr-btn-toggle rounded-lg px-3 py-1 flex items-center gap-1.5"
              style={MONO}
            >
              Search<span className="blink-cursor">_</span>
              <kbd className="text-xs ml-1 px-1.5 py-0.5 rounded" style={{ border: '1px solid var(--mr-border-default)', color: 'var(--mr-text-muted)' }}>/</kbd>
            </button>
            <button
              onClick={onOpenConsole}
              className="text-sm mr-btn-toggle rounded-lg px-3 py-1"
              style={MONO}
            >
              [C] CONSOLE
            </button>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center gap-1.5 w-6 h-6 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-0.5 rounded-full transition-transform" style={{ background: "var(--mr-text-primary)", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
            <span className="block w-6 h-0.5 rounded-full transition-opacity" style={{ background: "var(--mr-text-primary)", opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-6 h-0.5 rounded-full transition-transform" style={{ background: "var(--mr-text-primary)", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t" style={{ background: "var(--mr-bg-page)", borderColor: "var(--mr-border-default)" }}>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4 flex flex-col">
            <button
              onClick={() => { setMenuOpen(false); onOpenPalette(); }}
              className="py-3 text-lg font-medium mr-link-nav text-left flex items-center gap-2"
              style={MONO}
            >
              Search<span className="blink-cursor">_</span>
            </button>
            <button
              onClick={() => { setMenuOpen(false); onOpenConsole(); }}
              className="py-3 text-lg font-medium mr-link-nav text-left"
              style={MONO}
            >
              [C] Console
            </button>
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="py-3 text-lg font-medium mr-link-nav"
                style={MONO}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="home" className="pt-16 pb-16 md:pt-24 md:pb-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6">
          <div className="md:col-span-5 flex flex-col gap-8">
            <h1 className="text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[1.2] tracking-tight" style={{ color: "var(--mr-text-primary)" }}>
              You bought your team AI coding tools six months ago. They&rsquo;re still not faster.
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <HeroButton />
              <a href="#" className="text-lg font-medium underline underline-offset-4 mr-link-nav" style={MONO}>
                or talk to our team
              </a>
            </div>
          </div>
          <div className="md:col-start-7 md:col-span-6 flex items-end mt-8 md:mt-0">
            <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
              The tools aren&rsquo;t the problem. Nobody configured them for your codebase, nobody
              integrated them into your workflows, and nobody taught your team how to actually use
              them. We fix that.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 mb-12 md:mb-16">
            <div className="md:col-span-4">
              <SectionLabel>// 01 &mdash; THE_PROBLEM</SectionLabel>
              <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 md:mt-12" style={{ color: "var(--mr-text-primary)" }}>
                Every AI vendor is selling the same story. Here&rsquo;s what actually happened.
              </h2>
            </div>
            <div className="md:col-start-5 md:col-span-8 flex flex-col gap-6 mt-6 md:mt-0">
              <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-primary)" }}>
                Your senior engineers tried the suggestions for a few weeks. Found them wrong more
                often than useful&nbsp;&mdash; because the tool doesn&rsquo;t know your codebase. They
                quietly went back to how they worked before.
              </p>
              <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-primary)" }}>
                Your junior engineers kept accepting suggestions. The code looks right, passes review,
                and doesn&rsquo;t follow any of your architectural patterns. That debt is compounding.
                You just can&rsquo;t see it yet.
              </p>
              <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-primary)" }}>
                And the dashboards leadership tracks&nbsp;&mdash; seat activations, suggestion acceptance
                rates, lines generated&nbsp;&mdash; don&rsquo;t correlate with anything that matters.
              </p>
              <p className="text-[17px] leading-[1.6] mt-8" style={{ color: "var(--mr-text-primary)" }}>
                The problem was never the tools. Most AI coding tools were designed for greenfield
                projects and demo-ready codebases. Not the complex, layered, sometimes-ugly systems
                that real teams maintain. Making them productive in your environment requires work
                nobody wants to talk about: deep configuration, codebase-specific context, workflow
                integration, and engineers who know what they&rsquo;re doing.
              </p>
              <p className="text-xl font-medium leading-[1.6] mt-4" style={{ color: "var(--mr-text-primary)" }}>
                That&rsquo;s the work we do.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-8 sm:gap-y-10">
            {STATS.map((stat) => (
              <div key={stat.label} className="md:col-span-3">
                <p className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4" style={{ color: "var(--mr-text-primary)" }}>{stat.value}</p>
                <p className="text-xl font-medium mb-2" style={{ color: "var(--mr-text-primary)" }}>{stat.label}</p>
                <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6">
            <div className="md:col-span-4">
              <SectionLabel>// 02 &mdash; WHY_TEAMS_STALL</SectionLabel>
            </div>
            <div className="md:col-start-5 md:col-span-8 mt-6 md:mt-0">
              <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mb-10 md:mb-16" style={{ color: "var(--mr-text-primary)" }}>
                If any of this sounds familiar, you&rsquo;re not alone.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-12 md:gap-y-20">
                {SERVICES.map((service) => (
                  <div key={service.num} className="pt-8" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
                    <span className="text-lg font-medium block mb-3" style={{ ...MONO, color: "var(--mr-text-primary)" }}>
                      ({service.num})
                    </span>
                    <h3 className="text-lg font-medium mb-4" style={{ color: "var(--mr-text-primary)" }}>{service.title}</h3>
                    <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PathwaysSection() {
  return (
    <section id="pathways" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 mb-10 md:mb-16">
            <div className="md:col-span-5">
              <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mb-6" style={{ color: "var(--mr-text-primary)" }}>
                Two ways to start. Zero decks required.
              </h2>
              <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                Whether you need to understand where you stand or you&rsquo;re ready for hands-on
                help, we&rsquo;ve built entry points that respect your time. One is free. Both are
                built by engineers who&rsquo;ve done this before.
              </p>
            </div>
            <div className="md:col-start-7 md:col-span-6 flex items-end justify-start md:justify-end mt-4 md:mt-0">
              <SectionLabel align="right">// 03 &mdash; TWO_PATHWAYS</SectionLabel>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-6">
            {/* Trailhead */}
            <div className="lg:col-span-6 rounded-lg p-6 md:p-8 lg:p-10 flex flex-col" style={{ background: "var(--mr-bg-card)" }}>
              <h3 className="text-lg md:text-xl lg:text-2xl font-medium mb-4" style={{ color: "var(--mr-text-primary)" }}>Trailhead</h3>
              <p className="text-xl font-medium leading-[1.6] mb-4" style={{ color: "var(--mr-text-primary)" }}>
                Find out where you actually stand.
              </p>
              <p className="text-[17px] leading-[1.6] mb-4" style={{ color: "var(--mr-text-muted)" }}>
                A free, open-source assessment that evaluates your engineering org across four
                dimensions: codebase compatibility, tool configuration, team workflows, and
                organizational process.
              </p>
              <p className="text-[17px] leading-[1.6] mb-8" style={{ color: "var(--mr-text-muted)" }}>
                Not a marketing quiz. Not a lead-gen form. You&rsquo;ll get a detailed score with
                specific, actionable findings&nbsp;&mdash; whether or not you ever talk to us.
              </p>
              <div className="mt-auto flex flex-col gap-4">
                <a href="#" className="inline-flex mr-btn-pathway px-4 py-2 rounded-lg text-lg font-medium w-fit" style={MONO}>
                  Run the assessment<span className="blink-cursor">_</span>
                </a>
                <a href="#" className="text-lg font-medium underline underline-offset-4 mr-link-muted w-fit" style={MONO}>
                  or talk to our team
                </a>
              </div>
            </div>
            {/* Wayfinder */}
            <div className="lg:col-span-6 rounded-lg p-6 md:p-8 lg:p-10 flex flex-col" style={{ background: "var(--mr-bg-card)" }}>
              <h3 className="text-lg md:text-xl lg:text-2xl font-medium mb-4" style={{ color: "var(--mr-text-primary)" }}>Wayfinder</h3>
              <p className="text-xl font-medium leading-[1.6] mb-4" style={{ color: "var(--mr-text-primary)" }}>
                Get engineers in the room, not slides.
              </p>
              <p className="text-[17px] leading-[1.6] mb-4" style={{ color: "var(--mr-text-muted)" }}>
                Hands-on consulting and training delivered by people who&rsquo;ve built and led teams
                like yours. We work with your actual codebase, your real workflows, and your specific
                tools.
              </p>
              <p className="text-[17px] leading-[1.6] mb-8" style={{ color: "var(--mr-text-muted)" }}>
                Some teams need a focused sprint to configure and optimize. Others need a longer
                engagement to change how their org works with AI-assisted development. Either way, we
                start from where you are.
              </p>
              <div className="mt-auto flex flex-col gap-4">
                <a href="#" className="inline-flex mr-btn-pathway px-4 py-2 rounded-lg text-lg font-medium w-fit" style={MONO}>
                  Learn more about Wayfinder<span className="blink-cursor">_</span>
                </a>
                <a href="#" className="text-lg font-medium underline underline-offset-4 mr-link-muted w-fit" style={MONO}>
                  or book a conversation with our team
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section id="team" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6">
            <div className="md:col-span-4">
              <SectionLabel>// 04 &mdash; THE_TEAM</SectionLabel>
              <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 md:mt-12" style={{ color: "var(--mr-text-primary)" }}>
                Built by engineers, for engineering teams.
              </h2>
            </div>
            <div className="md:col-start-5 md:col-span-8 mt-6 md:mt-0">
              <p className="text-[17px] leading-[1.6] mb-16" style={{ color: "var(--mr-text-muted)" }}>
                Founded by engineering leaders who&rsquo;ve spent their careers building, scaling,
                and leading the kinds of teams navigating this right now.
              </p>
              <div className="pt-10 flex flex-col gap-10" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
                <div>
                  <p className="text-xl font-medium mb-2" style={{ color: "var(--mr-text-primary)" }}>Susan &mdash; Director of Engineering</p>
                  <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                    PhD in software engineering. Former McKinsey. Has led engineering orgs through
                    complex technical transformations and knows the distance between strategy and
                    execution from both sides.
                  </p>
                  <a href="#" className="text-sm mr-link-muted mt-2 inline-block" style={MONO}>LinkedIn &#8599;</a>
                </div>
                <div>
                  <p className="text-xl font-medium mb-2" style={{ color: "var(--mr-text-primary)" }}>Jeff &mdash; VP of Engineering</p>
                  <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                    15+ years leading engineering teams. Has been the buyer, the budget owner, and
                    the person who had to explain ROI on tooling investments to the board. Knows
                    what your seat feels like.
                  </p>
                  <a href="#" className="text-sm mr-link-muted mt-2 inline-block" style={MONO}>LinkedIn &#8599;</a>
                </div>
                <div>
                  <p className="text-xl font-medium mb-2" style={{ color: "var(--mr-text-primary)" }}>Spencer &mdash; Senior Software Engineer</p>
                  <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                    10+ years in real codebases, every day. Brings implementation-level understanding
                    of what actually happens when AI tools meet legacy systems, real-world constraints,
                    and engineering workflows that weren&rsquo;t designed for them.
                  </p>
                  <a href="#" className="text-sm mr-link-muted mt-2 inline-block" style={MONO}>LinkedIn &#8599;</a>
                </div>
              </div>
              <div className="mt-10 pt-10" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
                <p className="text-[17px] italic mb-8" style={{ color: "var(--mr-text-primary)" }}>
                  We&rsquo;re not consultants who read about your problems. We&rsquo;ve had them.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["TypeScript", "Python", "Go", "Rust", "React", "Node.js", "AWS", "LLMs"].map((badge) => (
                    <span key={badge} className="inline-flex rounded-full px-3 py-1 text-sm" style={{ ...MONO, background: "var(--mr-bg-card)", color: "var(--mr-text-primary)" }}>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CredibilitySection() {
  return (
    <section id="credibility" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6">
            <div className="md:col-span-4">
              <SectionLabel>// 05 &mdash; WHY_TRUST_US</SectionLabel>
            </div>
            <div className="md:col-start-5 md:col-span-8 mt-6 md:mt-0">
              <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mb-4" style={{ color: "var(--mr-text-primary)" }}>
                We lead with transparency, not promises.
              </h2>
              <p className="text-[17px] leading-[1.6] mb-16" style={{ color: "var(--mr-text-muted)" }}>
                We&rsquo;re a small, focused team. That&rsquo;s a strength, not a weakness.
                Here&rsquo;s how we build confidence without overpromising.
              </p>
              <div className="pt-12" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                  <div>
                    <p className="text-xl font-medium mb-3" style={{ color: "var(--mr-text-primary)" }}>Methodology</p>
                    <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                      Our assessment framework draws on established models including the MITRE AI
                      Maturity Model, adapted specifically for AI-assisted software development in
                      production codebases.
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-medium mb-3" style={{ color: "var(--mr-text-primary)" }}>Open source</p>
                    <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                      Trailhead is open source. Not because it&rsquo;s a marketing strategy. Because
                      the fastest way to earn an engineer&rsquo;s trust is to show them how you think.
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-medium mb-3" style={{ color: "var(--mr-text-primary)" }}>Focus</p>
                    <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                      We work exclusively with engineering teams at Series B&ndash;D technology
                      companies navigating AI-assisted development in established codebases. Narrow
                      focus. Intentional.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-12" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                  <div>
                    <p className="text-lg md:text-xl lg:text-2xl font-medium leading-[1.4] mb-8" style={{ color: "var(--mr-text-primary)" }}>
                      &ldquo;We&rsquo;d burned through six months of Copilot licenses before they
                      showed us what was actually happening. Within two weeks, our senior engineers
                      were using it again&nbsp;&mdash; and this time it was actually helping.&rdquo;
                    </p>
                    <p className="text-[17px]" style={{ color: "var(--mr-text-primary)" }}>VP of Engineering</p>
                    <p className="text-[17px]" style={{ color: "var(--mr-text-muted)" }}>Series C, Fintech &mdash; 120 engineers</p>
                  </div>
                  <div>
                    <p className="text-lg md:text-xl lg:text-2xl font-medium leading-[1.4] mb-8" style={{ color: "var(--mr-text-primary)" }}>
                      &ldquo;They didn&rsquo;t pitch us a deck. They opened our codebase, ran their
                      assessment, and showed us exactly where our AI tooling was falling down. First
                      time anyone made it that concrete.&rdquo;
                    </p>
                    <p className="text-[17px]" style={{ color: "var(--mr-text-primary)" }}>Director of Platform Engineering</p>
                    <p className="text-[17px]" style={{ color: "var(--mr-text-muted)" }}>Series D, SaaS &mdash; 85 engineers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ dark, onToggle, accent, onAccentChange }) {
  const [accentOpen, setAccentOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!accentOpen) return;
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setAccentOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [accentOpen]);
  return (
    <footer id="contact" className="py-16 md:py-20 lg:py-24" style={{ background: "var(--mr-footer-bg)", color: "var(--mr-footer-text)" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2]">
            Every team&rsquo;s path to productive AI-assisted development looks different.
          </h2>
          <p className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-2">
            Let&rsquo;s figure out yours.
          </p>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <a
            href="#"
            className="inline-flex mr-btn-primary px-4 py-2 rounded-lg text-lg font-medium w-fit"
            style={MONO}
          >
            Run Trailhead &mdash; see where your team stands<span className="blink-cursor">_</span>
          </a>
          <a
            href="#"
            className="inline-flex mr-btn-primary px-4 py-2 rounded-lg text-lg font-medium w-fit"
            style={MONO}
          >
            Book a conversation about Wayfinder<span className="blink-cursor">_</span>
          </a>
        </div>
        <p className="text-[17px] leading-[1.6] mb-16" style={{ color: "var(--mr-footer-sub)" }}>
          30 minutes. No pitch deck. Just your setup, your challenges, and a straight answer
          on whether we can help.
        </p>
        <div className="mb-12 md:mb-16 lg:mb-24" style={{ borderTop: "1px solid var(--mr-footer-divider)" }} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          {/* Contact info */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-lg font-medium mb-2" style={{ color: "var(--mr-footer-sub)" }}>Email</p>
              <a
                href="mailto:hello@manyroads.ai"
                className="text-lg font-medium hover:opacity-70 transition-opacity" style={{ color: "var(--mr-footer-text)" }}
              >
                hello@manyroads.ai
              </a>
            </div>
            <div>
              <p className="text-lg font-medium mb-2" style={{ color: "var(--mr-footer-sub)" }}>Phone</p>
              <a
                href="tel:+15551234567"
                className="text-lg font-medium hover:opacity-70 transition-opacity" style={{ color: "var(--mr-footer-text)" }}
              >
                +1 (555) 123-4567
              </a>
            </div>
          </div>
          {/* Navigation */}
          <div>
            <p className="text-lg font-medium mb-4" style={{ color: "var(--mr-footer-sub)" }}>Navigation</p>
            <div className="flex flex-col gap-2">
              {FOOTER_NAV.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-lg font-medium mr-link-footer"
                  style={MONO}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          {/* Social */}
          <div>
            <p className="text-lg font-medium mb-4" style={{ color: "var(--mr-footer-sub)" }}>Social</p>
            <div className="flex flex-col gap-2">
              {FOOTER_SOCIAL.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-lg font-medium mr-link-footer"
                  style={MONO}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Large wordmark */}
        <div className="mt-12 md:mt-16 lg:mt-24">
          <p className="text-[clamp(80px,15vw,200px)] font-medium leading-none tracking-tight">
            MANYROADS
          </p>
          <p className="text-sm mt-4" style={{ ...MONO, color: "var(--mr-footer-sub)" }}>v1.7</p>
        </div>
        {/* Theme & accent controls */}
        <div className="mt-12 pt-8 flex flex-wrap items-center gap-6" style={{ borderTop: "1px solid var(--mr-footer-divider)" }}>
          <button
            onClick={onToggle}
            className="text-sm rounded-lg px-3 py-1"
            style={{ ...MONO, color: "var(--mr-footer-text)", border: "1px solid var(--mr-footer-divider)", transition: "background-color 250ms ease, color 250ms ease" }}
          >
            {dark ? "[ light_ ]" : "[ dark_ ]"}
          </button>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAccentOpen(!accentOpen)}
              className="w-5 h-5 rounded-full cursor-pointer transition-transform hover:scale-110"
              style={{ backgroundColor: accent }}
            />
            {accentOpen && (
              <div className="absolute left-0 bottom-full mb-2 rounded-lg p-3 flex items-center gap-3 z-50" style={{ background: "var(--mr-footer-bg)", border: "1px solid var(--mr-footer-divider)" }}>
                {ACCENT_OPTIONS.map((opt) => (
                  <button
                    key={opt.color}
                    onClick={() => { onAccentChange(opt.color); setAccentOpen(false); }}
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                  >
                    <span
                      className="w-5 h-5 rounded-full transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: opt.color,
                        outline: accent === opt.color ? `2px solid ${opt.color}` : "none",
                        outlineOffset: "2px",
                      }}
                    />
                    <span className="text-xs whitespace-nowrap" style={{ ...MONO, color: "var(--mr-footer-sub)" }}>{opt.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function ManyroadsV2() {
  const [dark, setDark] = useState(false);

  // Sync with system preference after hydration
  useEffect(() => {
    setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);
  const [accent, setAccent] = useState("#3D7A41");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);

  useEffect(() => {
    function handleGlobalKey(e) {
      // Backtick or "c" toggles console (when not in input)
      if ((e.key === '`' || e.key === 'c') && !e.metaKey && !e.ctrlKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        e.preventDefault()
        setConsoleOpen(prev => !prev)
        return
      }
      // Cmd+K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setPaletteOpen(true)
        return
      }
      // "/" when no input/textarea is focused
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        e.preventDefault()
        setPaletteOpen(true)
      }
    }
    document.addEventListener('keydown', handleGlobalKey)
    return () => document.removeEventListener('keydown', handleGlobalKey)
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, []);

  return (
    <div
      className="v3-root min-h-screen transition-colors overflow-x-hidden"
      style={{ fontFamily: '"Geist Sans", sans-serif', "--accent": accent, "--accent-hover": darkenColor(accent), background: "var(--mr-bg-page)" }}
    >
      <style>{`.v3-root ::selection { background: var(--mr-accent-default); color: var(--mr-accent-on); }`}</style>
      <Navbar onOpenPalette={() => setPaletteOpen(true)} onOpenConsole={() => setConsoleOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} dark={dark} onToggleDark={() => setDark(!dark)} accent={accent} />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PathwaysSection />
        <TeamSection />
        <CredibilitySection />
      </main>
      <Footer dark={dark} onToggle={() => setDark(!dark)} accent={accent} onAccentChange={setAccent} />
      <MraiConsole open={consoleOpen} onClose={() => setConsoleOpen(false)} dark={dark} onToggleDark={() => setDark(!dark)} />
    </div>
  );
}
