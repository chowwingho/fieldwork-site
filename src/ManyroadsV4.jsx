'use client'
// Many Roads V4 — Site v4.0 — 2026-03-05
import { useState, useEffect, useRef } from "react";
import TopoCanvas from "./components/TopoCanvas";
import Logo from "./components/Logo";

// =============================================================================
// DATA CONSTANTS
// =============================================================================
const NAV_LINKS = ["--learn", "--resources"];
const FOOTER_NAV = ["Trailhead", "Wayfinder", "Team", "Contact"];
const FOOTER_SOCIAL = ["Twitter", "Instagram", "YouTube"];

const LOGOS = [
  "SignFlow", "CloudSync", "NotionKit", "DataStream",
  "NotionKit", "DataStream", "SignFlow", "CloudSync",
];

const FEATURES = [
  {
    title: "Codebase-aware assessment",
    desc: "Ask once, get exactly what you need. Our assessment understands your entire codebase and gives you precise findings with exact references.",
    cta: "Try Trailhead_",
    imageLabel: "AI Chat Interface",
    imageFirst: true,
  },
  {
    title: "Custom AI configuration",
    desc: "Stop choosing between 10 generic setups. We give you one perfect configuration that matches your code style and team intent.",
    cta: "See our approach_",
    imageLabel: "Configuration Dashboard",
    imageFirst: false,
  },
  {
    title: "Team workflow integration",
    desc: "Ship smarter with instant workflow detection, suggested improvements, and command optimization. Let us handle the heavy lifting.",
    cta: "Explore Wayfinder_",
    imageLabel: "Workflow Terminal",
    imageFirst: true,
  },
];

const USE_CASES = [
  {
    tab: "Assessment",
    title: "Understand your starting point",
    desc: "Run a comprehensive audit of your codebase, tooling, and team workflows. Get a detailed score and actionable findings — no commitment required.",
    cta: "Run assessment_",
    imageLabel: "Assessment Dashboard",
  },
  {
    tab: "Configuration",
    title: "Configure for your codebase",
    desc: "Set up AI tools tuned to your naming conventions, testing patterns, and deployment workflows. Zero guesswork, maximum precision.",
    cta: "Learn more_",
    imageLabel: "Configuration View",
  },
  {
    tab: "Training",
    title: "Upskill your entire team",
    desc: "Hands-on training sessions customized for your stack. Senior engineers learn advanced prompting, juniors learn when to trust — and when not to.",
    cta: "Explore training_",
    imageLabel: "Training Session",
  },
  {
    tab: "Ongoing support",
    title: "Sustain the improvement",
    desc: "Monthly check-ins, configuration updates, and workflow optimization. Keep your AI tooling aligned as your codebase evolves.",
    cta: "Talk to us_",
    imageLabel: "Support Dashboard",
  },
];

const BENEFITS = [
  { icon: "//", title: "Full codebase understanding", desc: "AI that understands your entire project, not just the current file." },
  { icon: ">_", title: "Works from day one", desc: "Install once, start coding. Zero configuration required." },
  { icon: "[]", title: "Your code stays yours", desc: "100% private by default. Your code never leaves your machine." },
  { icon: "<>", title: "Instant responses", desc: "Sub-50ms autocomplete and real-time AI. No lag, ever." },
  { icon: "{}", title: "Every stack you use", desc: "50+ languages supported with the same precision." },
  { icon: "~~", title: "Refactor with confidence", desc: "Change once, update everywhere. Zero broken imports." },
];

const TESTIMONIALS = [
  {
    quote: "MRAI cut my development time in half. The AI actually understands what I'm building and suggests exactly what I need. No more wading through irrelevant completions.",
    name: "Sarah Chen",
    role: "Senior Engineer",
  },
  {
    quote: "Finally, an AI consulting team that doesn't feel like they're guessing. Context-aware suggestions that actually make sense. It's like pair programming with someone who knows your codebase.",
    name: null,
    role: null,
  },
  {
    quote: "I was skeptical about AI coding tools until MRAI configured ours. The precision is unmatched — it gets my code style, understands dependencies, and never breaks my builds. Game changer.",
    name: "Emma Larsson",
    role: "Full-stack Developer",
  },
  {
    quote: "Best AI autocomplete I've ever used. It's like it reads my mind — one suggestion, always the right one. And the privacy-first approach gives me peace of mind.",
    name: "Ethan R",
    role: "DevOps Lead",
  },
  {
    quote: "Zero setup, instant productivity. I switched from Cursor and never looked back. The tools just work, and they're noticeably faster. The refactoring feature alone is worth it.",
    name: null,
    role: null,
  },
  {
    quote: "MRAI eliminated the back-and-forth I had with other AI assistants. Ask once, get the exact answer with line numbers and context. My productivity has skyrocketed.",
    name: null,
    role: null,
  },
];

const FRONTIER_FEATURES = [
  { title: "Use the best model for every task", desc: "Choose between every cutting-edge model from OpenAI, Anthropic, Gemini, xAI, and more.", link: "Explore models \u2197" },
  { title: "Complete codebase understanding", desc: "Our assessment learns how your codebase works, no matter the scale or complexity.", link: "Learn about indexing \u2197" },
  { title: "Develop enduring software", desc: "Trusted by engineering teams at leading companies to accelerate development, securely and at scale.", link: "Explore enterprise \u2192" },
];

const CHANGELOG_ENTRIES = [
  { title: "Cloud Agents with Computer Use", date: "Feb 24, 2026" },
  { title: "CLI Improvements and Mermaid ASCII Diagrams", date: "Feb 18, 2026" },
  { title: "Plugins, Sandbox Access Controls, and Async Subagents", date: "Feb 17, 2026", badge: "2.5" },
  { title: "Long-running Agents in Research Preview", date: "Feb 12, 2026" },
];

const HIGHLIGHTS = [
  { title: "Towards self-driving codebases", category: "Research", date: "Feb 5, 2026" },
  { title: "How leading teams are adopting AI-native workflows", category: "Customers", date: "Jan 21, 2026" },
  { title: "Best practices for coding with agents", category: "Product", date: "Jan 9, 2026" },
];

const PRICING_PLANS = [
  {
    name: "Assessment",
    price: { monthly: "Free", yearly: "Free" },
    desc: "Understand where you stand. All core features included, forever.",
    features: ["Codebase compatibility scan", "Tool configuration audit", "Team workflow analysis", "Org process review", "Detailed score + findings"],
    cta: "Get started_",
    ctaStyle: "ghost",
  },
  {
    name: "Wayfinder",
    price: { monthly: "$2,900", yearly: "$2,320" },
    badge: "Recommended",
    desc: "Hands-on configuration and training for your engineering team.",
    features: ["Everything in Assessment", "Custom AI tool configuration", "Codebase-specific context setup", "Team training sessions", "Workflow integration", "30-day follow-up"],
    cta: "Book a call_",
    ctaStyle: "solid",
  },
  {
    name: "Enterprise",
    price: { monthly: "Custom", yearly: "Custom" },
    desc: "Full transformation engagement with dedicated support and advanced security.",
    features: ["Everything in Wayfinder", "Dedicated engineering lead", "Multi-team rollout", "Custom toolchain integration", "Ongoing optimization", "Executive reporting", "Priority support"],
    cta: "Contact team_",
    ctaStyle: "ghost",
  },
];

const THREE_WAYS = [
  {
    title: "Self-serve assessment",
    desc: "Run Trailhead and get your score instantly. No calls, no commitment.",
    cta: "Run Trailhead free_",
    imageLabel: "Terminal CLI",
  },
  {
    title: "Guided engagement",
    desc: "Work directly with our team. Hands-on configuration and training.",
    cta: "Book a call_",
    imageLabel: "Desktop App",
  },
  {
    title: "Open source",
    desc: "Explore our tools and methodology. Contribute on GitHub.",
    cta: "View on GitHub \u2197",
    imageLabel: "Browser View",
  },
];

const FAQ_ITEMS = [
  { q: "Is the assessment really free?", a: "Yes, Trailhead is completely free. Run a full codebase compatibility scan, tool configuration audit, and team workflow analysis — no credit card, no commitment. You get a detailed score and actionable findings." },
  { q: "How does MRAI compare to hiring internally?", a: "We specialize in AI tool configuration and adoption — something most internal teams don't have deep expertise in. We typically deliver results in weeks, not months, and at a fraction of the cost of a full-time hire." },
  { q: "What about our code privacy?", a: "Your code never leaves your infrastructure. We configure tools to run locally, and our assessment process is designed with privacy-first principles. Enterprise clients get self-hosted deployment options." },
  { q: "What languages and frameworks do you support?", a: "We support 50+ languages and all major frameworks. Our configuration process is stack-agnostic — whether you're running React, Django, Rails, Go, or Rust, we tune your AI tools to your specific patterns." },
  { q: "Can we keep using our existing AI tools?", a: "Absolutely. We're tool-agnostic. Whether you use Copilot, Cursor, Cody, or any other AI coding tool, we configure and optimize what you already have. No vendor lock-in." },
  { q: "How quickly will we see results?", a: "Most teams see measurable improvement within the first two weeks. The Trailhead assessment gives instant results, and Wayfinder engagements typically show 30-50% productivity gains within 30 days." },
];

// =============================================================================
// FONT STYLES
// =============================================================================
const MONO = { fontFamily: '"Geist Mono", "SF Mono", "Fira Code", "Fira Mono", monospace' };

// =============================================================================
// SHARED COMPONENTS
// =============================================================================
function SectionLabel({ children }) {
  const rendered = typeof children === "string" && children.startsWith("//")
    ? (<><span style={{ color: "var(--mr-accent-default)" }}>//</span>{children.slice(2)}</>)
    : children;
  return (
    <span className="text-sm font-medium tracking-normal" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
      {rendered}
    </span>
  );
}


function PlaceholderImage({ label, aspectRatio = "16/9", className = "" }) {
  return (
    <div
      className={`w-full flex items-center justify-center ${className}`}
      style={{
        aspectRatio,
        background: "var(--mr-bg-card)",
        border: "1px solid var(--mr-border-default)",
        borderRadius: "var(--mr-radius-lg)",
      }}
    >
      <div className="text-center px-4">
        <span className="text-sm font-medium block mb-1" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
          [ {label} ]
        </span>
        <span className="text-xs" style={{ ...MONO, color: "var(--mr-text-muted)", opacity: 0.5 }}>
          screenshot placeholder
        </span>
      </div>
    </div>
  );
}

function SolidButton({ children, href = "#" }) {
  return (
    <a
      href={href}
      className="inline-flex items-center mr-btn-primary px-5 py-2.5 rounded-lg text-base font-medium w-fit"
      style={MONO}
    >
      {children}
    </a>
  );
}

function GhostButton({ children, href = "#" }) {
  return (
    <a
      href={href}
      className="inline-flex items-center mr-btn-toggle px-5 py-2.5 rounded-lg text-base font-medium w-fit"
      style={MONO}
    >
      {children}
    </a>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="7.5" stroke="var(--mr-accent-default)" strokeWidth="1" />
      <path d="M5 8l2 2 4-4" stroke="var(--mr-accent-default)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// =============================================================================
// SECTIONS
// =============================================================================
function Navbar() {
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
    function handleResize() {
      if (window.innerWidth >= 768) setMenuOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50" style={{ background: "var(--mr-bg-page)", borderBottom: "1px solid var(--mr-border-default)" }} ref={menuRef}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#">
          <Logo className="h-6 md:h-7 w-auto" style={{ color: "var(--mr-text-primary)" }} />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
              className="text-base font-medium mr-link-nav"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right side: CTA + toggle + hamburger */}
        <div className="flex items-center gap-3">
          <a href="#faq" className="hidden md:inline-flex text-sm mr-btn-toggle rounded-lg px-3 py-1.5" style={MONO}>
            Get started_
          </a>
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="w-5 h-0.5 rounded-full" style={{ background: "var(--mr-text-primary)" }} />
            <span className="w-5 h-0.5 rounded-full" style={{ background: "var(--mr-text-primary)" }} />
            <span className="w-5 h-0.5 rounded-full" style={{ background: "var(--mr-text-primary)" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3" style={{ background: "var(--mr-bg-page)" }}>
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium py-2 mr-link-nav"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              {link}
            </a>
          ))}
          <a href="#faq" className="text-sm mr-btn-toggle rounded-lg px-3 py-1.5 w-fit mt-2" style={MONO}>
            Get started_
          </a>
        </div>
      )}
    </nav>
  );
}

const HERO_CMD = "git clone https://github.com/manyroads-ai/readiness.git && cd readiness && npm install";

function HeroSection() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(HERO_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <section className="pt-16 pb-12 md:pt-28 md:pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <h1 className="text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[1.1] tracking-tight" style={{ color: "var(--mr-text-primary)" }}>
            Build with AI precision.
          </h1>
          <p className="text-[17px] leading-[1.6] max-w-xl" style={{ color: "var(--mr-text-muted)" }}>
            The AI consulting team that gets your engineering org exactly right.
            No guesswork. No generic tooling. Just real results, every time.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <SolidButton>Run the assessment_</SolidButton>
          </div>

          {/* Terminal command block */}
          <div
            className="flex items-center gap-3 px-4 py-3 w-full max-w-2xl overflow-x-auto"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
              borderRadius: "var(--mr-radius-md)",
            }}
          >
            <span className="text-sm shrink-0" style={{ ...MONO, color: "var(--mr-text-muted)" }}>$</span>
            <code className="text-sm flex-1 min-w-0 truncate text-left" style={{ ...MONO, color: "var(--mr-text-primary)" }}>
              {HERO_CMD}
            </code>
            <button
              onClick={handleCopy}
              className="text-xs shrink-0 px-2.5 py-1 rounded cursor-pointer transition-colors"
              style={{
                ...MONO,
                background: "var(--mr-bg-button-primary)",
                color: "var(--mr-text-muted)",
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
        <div className="mt-12 md:mt-16">
          <PlaceholderImage label="AI Code Editor Interface" aspectRatio="16/9" className="max-w-4xl mx-auto" />
        </div>
      </div>
    </section>
  );
}

function LogoStripSection() {
  return (
    <section className="py-10 md:py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 text-center">
        <p className="text-xl font-medium mb-2" style={{ color: "var(--mr-text-primary)" }}>
          Trusted by engineering teams at leading companies
        </p>
        <p className="text-base mb-8" style={{ color: "var(--mr-text-muted)" }}>
          Used by developers at
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {LOGOS.map((name, i) => (
            <div
              key={i}
              className="rounded-lg px-4 py-3 text-sm font-medium flex items-center justify-center"
              style={{ ...MONO, background: "var(--mr-bg-card)", color: "var(--mr-text-muted)" }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 01 — CORE_FEATURES</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 mb-12 md:mb-16" style={{ color: "var(--mr-text-primary)" }}>
            Assess with precision. Transform with confidence.
          </h2>

          <div className="flex flex-col gap-12 md:gap-16">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
              >
                <div className={`grid grid-cols-1 md:grid-cols-2 ${f.imageFirst ? "" : "md:[direction:rtl]"}`}>
                  <div className={f.imageFirst ? "" : "md:[direction:ltr]"}>
                    <PlaceholderImage label={f.imageLabel} aspectRatio="4/3" className="rounded-none h-full" />
                  </div>
                  <div className={`p-6 md:p-10 flex flex-col justify-center gap-4 ${f.imageFirst ? "" : "md:[direction:ltr]"}`}>
                    <h3 className="text-xl font-medium" style={{ color: "var(--mr-text-primary)" }}>
                      {f.title}
                    </h3>
                    <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                      {f.desc}
                    </p>
                    <GhostButton>{f.cta}</GhostButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = USE_CASES[activeTab];

  return (
    <section id="use-cases" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 02 — USE_CASES</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 mb-10" style={{ color: "var(--mr-text-primary)" }}>
            One team. Every challenge.
          </h2>

          {/* Tab bar */}
          <div className="flex flex-wrap gap-2 mb-8 rounded-xl p-1 w-fit" style={{ background: "var(--mr-bg-card)" }}>
            {USE_CASES.map((uc, i) => (
              <button
                key={uc.tab}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  i === activeTab ? "mr-btn-primary" : ""
                }`}
                style={{
                  ...MONO,
                  color: i === activeTab ? "var(--mr-text-primary)" : "var(--mr-text-muted)",
                  background: i === activeTab ? "var(--mr-bg-button-primary)" : "transparent",
                }}
              >
                {uc.tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <PlaceholderImage label={current.imageLabel} aspectRatio="16/9" className="mb-8" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-sm font-medium mb-2" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
                {current.tab}
              </p>
              <p className="text-xl font-medium mb-2" style={{ color: "var(--mr-text-primary)" }}>
                {current.desc}
              </p>
            </div>
            <GhostButton>{current.cta}</GhostButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 03 — BENEFITS</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 mb-10" style={{ color: "var(--mr-text-primary)" }}>
            Ship faster. Adopt smarter.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <div
                key={i}
                className="rounded-lg p-6 flex flex-col gap-4"
                style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
              >
                {/* Icon circle */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ ...MONO, background: "var(--mr-bg-button-primary)", color: "var(--mr-text-primary)" }}
                >
                  {b.icon}
                </div>
                <h3 className="text-base font-medium" style={{ color: "var(--mr-text-primary)" }}>
                  {b.title}
                </h3>
                <p className="text-base leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 04 — TESTIMONIALS</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 mb-10" style={{ color: "var(--mr-text-primary)" }}>
            Loved by engineering teams. Built for productivity.
          </h2>

          {/* Masonry grid */}
          <div className="relative">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6" style={{ columnFill: "balance" }}>
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="break-inside-avoid mb-6 rounded-lg p-6"
                  style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
                >
                  <p className="text-[17px] leading-[1.6] mb-4" style={{ color: "var(--mr-text-primary)" }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  {t.name && (
                    <>
                      <div className="mb-4" style={{ borderTop: "1px solid var(--mr-border-default)" }} />
                      <div>
                        <p className="text-sm font-medium" style={{ ...MONO, color: "var(--mr-text-primary)" }}>
                          {t.name}
                        </p>
                        <p className="text-sm" style={{ color: "var(--mr-text-muted)" }}>
                          {t.role}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            {/* Bottom fade */}
            <div
              className="h-24 -mt-24 relative z-10 pointer-events-none"
              style={{ background: "linear-gradient(to top, var(--mr-bg-page), transparent)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, desc, link }) {
  return (
    <div
      className="rounded-lg p-6"
      style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
    >
      <h3 className="text-xl font-medium" style={{ color: "var(--mr-text-primary)" }}>{title}</h3>
      <p className="text-[17px] leading-[1.6] mt-2" style={{ color: "var(--mr-text-muted)" }}>{desc}</p>
      <a
        href="#"
        className="inline-block text-sm mt-4"
        style={{ ...MONO, color: "var(--mr-accent-default)" }}
      >
        {link}
      </a>
      <div
        className="mt-6 aspect-[4/3] rounded flex items-center justify-center"
        style={{ background: "var(--mr-bg-button-primary)" }}
      >
        <span className="text-sm" style={{ ...MONO, color: "var(--mr-text-muted)" }}>Image placeholder</span>
      </div>
    </div>
  );
}

function FrontierSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 04 — FRONTIER</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4" style={{ color: "var(--mr-text-primary)" }}>
            Stay on the frontier
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 md:mt-16">
            {FRONTIER_FEATURES.map((f) => (
              <FeatureCard key={f.title} title={f.title} desc={f.desc} link={f.link} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChangelogSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 05 — CHANGELOG</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4" style={{ color: "var(--mr-text-primary)" }}>
            Changelog
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 md:mt-16">
            {CHANGELOG_ENTRIES.map((entry) => (
              <div
                key={entry.title}
                className="rounded-lg p-6"
                style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ ...MONO, color: "var(--mr-text-muted)" }}>{entry.date}</span>
                  {entry.badge && (
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{ ...MONO, background: "var(--mr-bg-button-primary)", color: "var(--mr-text-primary)" }}
                    >
                      {entry.badge}
                    </span>
                  )}
                </div>
                <p className="text-[17px] font-medium mt-2" style={{ color: "var(--mr-text-primary)" }}>{entry.title}</p>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="inline-block text-sm mt-8"
            style={{ ...MONO, color: "var(--mr-accent-default)" }}
          >
            See what&rsquo;s new &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 05 — PRICING</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 mb-8" style={{ color: "var(--mr-text-primary)" }}>
            Start free. Scale as you grow.
          </h2>

          {/* Toggle */}
          <div className="flex items-center gap-3 mb-10">
            <div className="flex rounded-full p-1" style={{ background: "var(--mr-bg-card)" }}>
              <button
                onClick={() => setYearly(false)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer"
                style={{
                  ...MONO,
                  background: !yearly ? "var(--mr-bg-button-primary)" : "transparent",
                  color: !yearly ? "var(--mr-text-primary)" : "var(--mr-text-muted)",
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setYearly(true)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer"
                style={{
                  ...MONO,
                  background: yearly ? "var(--mr-bg-button-primary)" : "transparent",
                  color: yearly ? "var(--mr-text-primary)" : "var(--mr-text-muted)",
                }}
              >
                Yearly
              </button>
            </div>
            {yearly && (
              <span className="text-sm font-medium" style={{ color: "var(--mr-accent-default)" }}>
                Save 20%
              </span>
            )}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PRICING_PLANS.map((plan, i) => (
              <div
                key={i}
                className="rounded-xl p-6 md:p-8 flex flex-col"
                style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-medium" style={{ color: "var(--mr-text-primary)" }}>
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ ...MONO, background: "var(--mr-accent-default)", color: "var(--mr-accent-on)" }}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-[36px] font-medium" style={{ ...MONO, color: "var(--mr-text-primary)" }}>
                    {yearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  {plan.price.monthly !== "Free" && plan.price.monthly !== "Custom" && (
                    <span className="text-sm" style={{ color: "var(--mr-text-muted)" }}>
                      /engagement
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm leading-[1.5] mb-6" style={{ color: "var(--mr-text-muted)" }}>
                  {plan.desc}
                </p>

                {/* CTA */}
                <div className="mb-6">
                  {plan.ctaStyle === "solid" ? (
                    <SolidButton>{plan.cta}</SolidButton>
                  ) : (
                    <span className="text-base font-medium cursor-pointer mr-link-nav" style={{ ...MONO, color: "var(--mr-text-primary)" }}>
                      {plan.cta}
                    </span>
                  )}
                </div>

                {/* Divider + Features */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px" style={{ background: "var(--mr-border-default)" }} />
                  <span className="text-sm" style={{ ...MONO, color: "var(--mr-text-muted)" }}>Features</span>
                  <div className="flex-1 h-px" style={{ background: "var(--mr-border-default)" }} />
                </div>

                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-2.5">
                      <CheckIcon />
                      <span className="text-sm" style={{ color: "var(--mr-text-muted)" }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ThreeWaysSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 06 — THREE_WAYS</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 mb-10" style={{ color: "var(--mr-text-primary)" }}>
            Start your way. Choose what works best.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {THREE_WAYS.map((item, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden flex flex-col"
                style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
              >
                <PlaceholderImage label={item.imageLabel} aspectRatio="4/3" className="rounded-none" />
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <h3 className="text-xl font-medium" style={{ color: "var(--mr-text-primary)" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-[1.6] flex-1" style={{ color: "var(--mr-text-muted)" }}>
                    {item.desc}
                  </p>
                  <GhostButton>{item.cta}</GhostButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8">
            {/* Left: heading */}
            <div className="md:col-span-4">
              <SectionLabel>// 06 — FAQ</SectionLabel>
              <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4" style={{ color: "var(--mr-text-primary)" }}>
                Questions? We&rsquo;ve got answers.
              </h2>
            </div>

            {/* Right: accordion */}
            <div className="md:col-start-6 md:col-span-7">
              {FAQ_ITEMS.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left cursor-pointer rounded-lg px-5 mb-2"
                    style={{ background: "var(--mr-bg-card)" }}
                  >
                    <span className="text-base font-medium pr-4" style={{ color: "var(--mr-text-primary)" }}>
                      {faq.q}
                    </span>
                    <span className="text-lg shrink-0" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
                      {openIndex === i ? "\u2212" : "+"}
                    </span>
                  </button>
                  {openIndex === i && (
                    <div className="px-5 pb-4 mb-2">
                      <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HighlightsSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32" style={{ background: "var(--mr-bg-card)" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 07 — HIGHLIGHTS</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4" style={{ color: "var(--mr-text-primary)" }}>
            Recent highlights
          </h2>
          <div className="flex flex-col gap-6 mt-10 md:mt-16">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.title}
                className="rounded-lg p-6"
                style={{ background: "var(--mr-bg-card-elevated)", border: "1px solid var(--mr-border-default)" }}
              >
                <h3 className="text-xl font-medium" style={{ color: "var(--mr-text-primary)" }}>{h.title}</h3>
                <p className="text-sm mt-2" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
                  {h.category} &middot; {h.date}
                </p>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="inline-block text-sm mt-8"
            style={{ ...MONO, color: "var(--mr-accent-default)" }}
          >
            View more posts &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="rounded-xl p-8 md:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center" style={{ background: "var(--mr-bg-card)" }}>
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mb-4" style={{ color: "var(--mr-text-primary)" }}>
              Start building with precision today
            </h2>
            <p className="text-[17px] leading-[1.6] mb-2" style={{ color: "var(--mr-text-muted)" }}>
              Free assessment. No commitment.
            </p>
            <p className="text-[17px] leading-[1.6] mb-6" style={{ color: "var(--mr-text-muted)" }}>
              Start seeing results immediately.
            </p>
            <SolidButton>Run the assessment_</SolidButton>
          </div>
          <PlaceholderImage label="Code Editor" aspectRatio="4/3" />
        </div>
      </div>
    </section>
  );
}

function Footer({ dark, onToggle }) {
  const [email, setEmail] = useState("");

  return (
    <footer id="contact" className="py-16 md:py-20 lg:py-24" style={{ background: "var(--mr-footer-bg)", color: "var(--mr-footer-text)" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-md mb-16">
          <Logo className="h-8 w-auto mb-3" style={{ color: "var(--mr-footer-text)" }} />
          <p className="text-sm leading-[1.6] mb-6" style={{ color: "var(--mr-footer-sub)" }}>
            Sign up for dispatches on AI adoption, engineering culture, and what we&rsquo;re learning.
          </p>
          <div className="mr-footer-input-wrap">
            <input
              className="mr-footer-input flex-1 px-4 py-3 text-sm outline-none min-w-0"
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="mr-footer-subscribe px-5 py-3 text-[13px] font-medium whitespace-nowrap cursor-pointer"
              style={MONO}
            >
              Subscribe_
            </button>
          </div>
        </div>
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
        {/* Bottom bar */}
        <div className="mt-12 pt-8 flex flex-wrap items-center justify-between gap-6" style={{ borderTop: "1px solid var(--mr-footer-divider)" }}>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "var(--mr-status-positive)" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "var(--mr-status-positive)" }} />
            </span>
            <span className="text-sm" style={{ ...MONO, color: "var(--mr-footer-sub)" }}>All systems operational</span>
          </div>
          <button
            onClick={onToggle}
            className="text-sm rounded-lg px-3 py-1 cursor-pointer"
            style={{ ...MONO, color: "var(--mr-footer-text)", border: "1px solid var(--mr-footer-divider)", transition: "background-color 250ms ease, color 250ms ease" }}
          >
            {dark ? "[ light_ ]" : "[ dark_ ]"}
          </button>
        </div>
      </div>
    </footer>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function ManyroadsV4() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div
      className="min-h-screen transition-colors overflow-x-hidden"
      style={{ fontFamily: '"Geist Sans", sans-serif', background: "var(--mr-bg-page)" }}
    >
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <UseCasesSection />
        <BenefitsSection />
        <FrontierSection />
        <ChangelogSection />
        <FaqSection />
        <HighlightsSection />
        <FinalCtaSection />
      </main>
      <Footer dark={dark} onToggle={() => setDark(!dark)} />
    </div>
  );
}
