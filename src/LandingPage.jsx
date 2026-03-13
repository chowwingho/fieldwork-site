'use client'
// Leading Intelligence — Landing Page — v5.0
import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import SectionLabel from "./components/shared/SectionLabel";
import SolidButton from "./components/shared/SolidButton";
import GhostButton from "./components/shared/GhostButton";
import BrowserFrameMockup from "./components/shared/BrowserFrameMockup";
import { MONO } from "./components/shared/constants";

// =============================================================================
// DATA CONSTANTS
// =============================================================================

const ANNOTATION_CARDS = [
  {
    title: "Radar chart",
    desc: "Visual snapshot of balance across all four categories.",
  },
  {
    title: "Scored areas",
    desc: "13 areas rated individually. Color-coded so you can scan in seconds.",
  },
  {
    title: "Priority actions",
    desc: "Ranked recommendations specific to your results.",
  },
];

const CATEGORIES = [
  {
    name: "Artifacts",
    areas: ["Standards", "Documentation", "Requirements", "Testing", "Architecture"],
  },
  {
    name: "Process",
    areas: ["Reviews", "Tech Debt", "Security", "Metrics"],
  },
  {
    name: "Tooling",
    areas: ["CI/CD", "IDE"],
  },
  {
    name: "Culture",
    areas: ["Ownership", "Decisions"],
  },
];

const STEPS = [
  {
    num: "01",
    title: "Start the conversation",
    desc: "Paste the assessment prompt into your AI of choice. It walks you through 31 structured questions about your engineering practices. Takes about 25 minutes.",
  },
  {
    num: "02",
    title: "Get your report",
    desc: "Your AI scores responses against our rubric and generates a detailed markdown report — category scores, visibility gaps, and priority recommendations.",
  },
  {
    num: "03",
    title: "Visualize your results",
    desc: "Use the second prompt to turn your markdown report into an interactive HTML dashboard — radar charts, area breakdowns, and a prioritized action plan.",
  },
];

const DISCOVERIES = [
  {
    stat: "68%",
    insight: "of teams we've assessed score Security Governance as 'Not Sure' — they don't know what they don't know.",
  },
  {
    stat: "1.4",
    insight: "Average first-assessment score out of 3. Most teams overestimate their readiness until they see the breakdown.",
  },
  {
    stat: "2×",
    insight: "Teams that assess before adopting AI tools report half as many integration failures in the first quarter.",
  },
];

const TEAM = [
  {
    num: "01",
    name: "Alex Rivera",
    role: "Founding Partner",
    credential: "15 years engineering leadership at Series B–D companies",
  },
  {
    num: "02",
    name: "Jordan Kim",
    role: "Principal Consultant",
    credential: "Former VP Engineering, scaled 3 teams through AI adoption",
  },
  {
    num: "03",
    name: "Sam Chen",
    role: "Assessment Lead",
    credential: "Built the scoring rubric from 40+ consulting engagements",
  },
];

const TIERS = [
  {
    name: "Self-serve assessment",
    price: "Free",
    desc: "Run the prompt with your team. Get a scored report and interactive dashboard.",
    cta: "Get the prompt_",
    ctaHref: "/assessment",
    ctaStyle: "ghost",
  },
  {
    name: "Guided session",
    price: "Paid",
    desc: "We facilitate the assessment with your team. Expert interpretation, custom recommendations.",
    cta: "Book a session_",
    ctaHref: "#contact",
    ctaStyle: "solid",
    badge: "Recommended",
  },
  {
    name: "Transformation",
    price: "Enterprise",
    desc: "Full AI adoption strategy. Implementation support. Ongoing advisory.",
    cta: "Let's talk_",
    ctaHref: "#contact",
    ctaStyle: "ghost",
  },
];

const FAQ_ITEMS = [
  {
    q: "Which AI models does this work with?",
    a: "Any modern LLM — Claude, ChatGPT, Gemini, Llama, and others. The prompt is model-agnostic. We recommend Claude or ChatGPT for the most consistent scoring.",
  },
  {
    q: "How long does the assessment take?",
    a: "About 25 minutes for one person. For richer data, have 2–3 team members run it independently and compare results — divergent scores reveal alignment gaps.",
  },
  {
    q: "Is my assessment data shared with anyone?",
    a: "No. Everything stays in your AI conversation. We never see your answers, your scores, or your report. Your data is entirely yours.",
  },
  {
    q: "How accurate is the AI scoring?",
    a: "The rubric is calibrated against our consulting framework. The AI applies it consistently — but the guided session option exists for teams that want expert interpretation.",
  },
  {
    q: "What if different team members get different scores?",
    a: "That's a feature, not a bug. Divergent scores reveal alignment gaps — different people see different realities. Those gaps are just as valuable as the scores themselves.",
  },
];

// =============================================================================
// SECTIONS
// =============================================================================

function HeroSection() {
  return (
    <section className="pt-16 pb-12 md:pt-28 md:pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <h1
            className="text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[1.1] tracking-tight"
            style={{ color: "var(--mr-text-primary)" }}
          >
            Know exactly where your engineering team stands on AI readiness.
          </h1>
          <p className="text-[17px] leading-[1.6] max-w-xl" style={{ color: "var(--mr-text-muted)" }}>
            A structured assessment framework — built from real consulting engagements — that you can run with any AI assistant in 25 minutes.
          </p>
          <SolidButton href="/assessment">Get the assessment prompt_</SolidButton>
          {/* LLM compatibility strip */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm" style={{ ...MONO, color: "var(--mr-text-muted)" }}>Works with:</span>
            {["Claude", "ChatGPT", "Gemini", "Any LLM"].map((llm) => (
              <span
                key={llm}
                className="text-sm px-3 py-1"
                style={{
                  ...MONO,
                  background: "var(--mr-bg-card)",
                  color: "var(--mr-text-muted)",
                  borderRadius: "var(--mr-radius-sm)",
                }}
              >
                {llm}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReportShowcaseSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 01 — SAMPLE_OUTPUT</SectionLabel>
          <h2
            className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 mb-10"
            style={{ color: "var(--mr-text-primary)" }}
          >
            This is what your team gets.
          </h2>

          <BrowserFrameMockup
            filename="acme-engineering-readiness-report.html"
            label="Sample Report Preview"
          />

          <div className="mt-4 text-center">
            <Link href="/sample-report" className="text-sm" style={{ ...MONO, color: "var(--mr-accent-default)" }}>
              See the full sample report_
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {ANNOTATION_CARDS.map((card) => (
              <div
                key={card.title}
                className="rounded-lg p-6"
                style={{
                  background: "var(--mr-bg-card)",
                  border: "1px solid var(--mr-border-default)",
                  borderRadius: "var(--mr-radius-md)",
                }}
              >
                <p className="text-sm font-medium mb-2" style={{ ...MONO, color: "var(--mr-accent-default)" }}>
                  {card.title}
                </p>
                <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodologySection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 02 — THE_METHODOLOGY</SectionLabel>
          <h2
            className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 mb-10"
            style={{ color: "var(--mr-text-primary)" }}
          >
            4 categories. 13 areas. 31 assessment points.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="rounded-lg p-6"
                style={{
                  background: "var(--mr-bg-card)",
                  border: "1px solid var(--mr-border-default)",
                  borderRadius: "var(--mr-radius-md)",
                }}
              >
                <h3 className="text-xl font-medium mb-4" style={{ color: "var(--mr-text-primary)" }}>
                  {cat.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.areas.map((area) => (
                    <span
                      key={area}
                      className="text-sm px-2.5 py-1"
                      style={{
                        ...MONO,
                        background: "var(--mr-bg-button-primary)",
                        color: "var(--mr-text-primary)",
                        borderRadius: "var(--mr-radius-sm)",
                      }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[17px] leading-[1.6] max-w-3xl" style={{ color: "var(--mr-text-muted)" }}>
            Each area is calibrated against what we&rsquo;ve observed across dozens of engineering teams adopting AI.
            The scoring rubric distinguishes between gaps you know about and blind spots you don&rsquo;t — because
            &ldquo;we&rsquo;re weak here&rdquo; and &ldquo;we don&rsquo;t even know&rdquo; require different responses.
          </p>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 03 — HOW_IT_WORKS</SectionLabel>
          <h2
            className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 mb-10"
            style={{ color: "var(--mr-text-primary)" }}
          >
            Three steps. Two prompts. One clear picture.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="rounded-lg p-6 flex flex-col gap-4"
                style={{
                  background: "var(--mr-bg-card)",
                  border: "1px solid var(--mr-border-default)",
                  borderRadius: "var(--mr-radius-md)",
                }}
              >
                <p className="text-sm font-medium" style={{ ...MONO, color: "var(--mr-accent-default)" }}>
                  ({step.num})
                </p>
                <h3 className="text-xl font-medium" style={{ color: "var(--mr-text-primary)" }}>
                  {step.title}
                </h3>
                <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DiscoveriesSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 04 — WHAT_TEAMS_DISCOVER</SectionLabel>
          <h2
            className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 mb-10"
            style={{ color: "var(--mr-text-primary)" }}
          >
            Patterns we see across teams.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DISCOVERIES.map((d, i) => (
              <div
                key={i}
                className="rounded-lg p-6 flex flex-col gap-4"
                style={{
                  background: "var(--mr-bg-card)",
                  border: "1px solid var(--mr-border-default)",
                  borderRadius: "var(--mr-radius-md)",
                }}
              >
                <p className="text-5xl font-medium" style={{ ...MONO, color: "var(--mr-accent-default)" }}>
                  {d.stat}
                </p>
                <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                  {d.insight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 05 — BUILT_BY_PRACTITIONERS</SectionLabel>
          <h2
            className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 mb-10"
            style={{ color: "var(--mr-text-primary)" }}
          >
            The team behind the framework.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Team cards */}
            <div className="flex flex-col gap-6">
              {TEAM.map((member) => (
                <div
                  key={member.num}
                  className="rounded-lg p-6 flex flex-col gap-3"
                  style={{
                    background: "var(--mr-bg-card)",
                    border: "1px solid var(--mr-border-default)",
                    borderRadius: "var(--mr-radius-md)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium" style={{ ...MONO, color: "var(--mr-accent-default)" }}>
                      ({member.num})
                    </span>
                    <h3 className="text-xl font-medium" style={{ color: "var(--mr-text-primary)" }}>
                      {member.name}
                    </h3>
                  </div>
                  <p className="text-base font-medium" style={{ color: "var(--mr-text-muted)" }}>
                    {member.role}
                  </p>
                  <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                    {member.credential}
                  </p>
                </div>
              ))}
            </div>

            {/* Consulting context */}
            <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
              Leading Intelligence works with Series B–D tech companies navigating AI adoption. The assessment
              framework is drawn from our consulting engagements — the same methodology our team uses with clients,
              packaged so any engineering team can run it independently.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceTiersSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 06 — WHAT_COMES_NEXT</SectionLabel>
          <h2
            className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 mb-10"
            style={{ color: "var(--mr-text-primary)" }}
          >
            Go as deep as you need.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className="rounded-lg p-6 flex flex-col gap-4"
                style={{
                  background: "var(--mr-bg-card)",
                  border: "1px solid var(--mr-border-default)",
                  borderRadius: "var(--mr-radius-md)",
                }}
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-medium" style={{ color: "var(--mr-text-primary)" }}>
                      {tier.name}
                    </h3>
                    {tier.badge && (
                      <span
                        className="text-xs px-2 py-0.5 font-medium shrink-0 ml-2"
                        style={{
                          ...MONO,
                          background: "var(--mr-accent-default)",
                          color: "var(--mr-accent-on)",
                          borderRadius: "var(--mr-radius-sm)",
                        }}
                      >
                        {tier.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
                    {tier.price}
                  </p>
                </div>

                <p className="text-[17px] leading-[1.6] flex-1" style={{ color: "var(--mr-text-muted)" }}>
                  {tier.desc}
                </p>

                {tier.ctaStyle === "solid" ? (
                  <SolidButton href={tier.ctaHref}>{tier.cta}</SolidButton>
                ) : (
                  <GhostButton href={tier.ctaHref}>{tier.cta}</GhostButton>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8">
            <div className="md:col-span-4">
              <SectionLabel>// 07 — QUESTIONS</SectionLabel>
              <h2
                className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4"
                style={{ color: "var(--mr-text-primary)" }}
              >
                Questions?
              </h2>
            </div>

            <div className="md:col-start-6 md:col-span-7 flex flex-col gap-8">
              {FAQ_ITEMS.map((faq) => (
                <div key={faq.q}>
                  <p className="text-base font-medium mb-2" style={{ color: "var(--mr-text-primary)" }}>
                    {faq.q}
                  </p>
                  <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div
          className="rounded-xl p-8 md:p-12 lg:p-16 text-center flex flex-col items-center gap-6"
          style={{ background: "var(--mr-bg-card)" }}
        >
          <h2
            className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2]"
            style={{ color: "var(--mr-text-primary)" }}
          >
            Find out where your team stands.
          </h2>
          <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
            Free. 25 minutes. Any AI assistant.
          </p>
          <SolidButton href="/assessment">Get the assessment prompt_</SolidButton>
          <Link href="#contact" className="text-[17px] underline" style={{ color: "var(--mr-text-muted)" }}>
            Or book a guided session_
          </Link>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function LandingPage() {
  const [darkOverride, setDarkOverride] = useState(null);

  const systemDark = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    () => false,
  );

  const dark = darkOverride ?? systemDark;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    return () => document.documentElement.removeAttribute("data-theme");
  }, [dark]);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ fontFamily: '"Geist Sans", sans-serif', background: "var(--mr-bg-page)" }}
    >
      <Navbar dark={dark} onToggle={() => setDarkOverride(!dark)} />
      <main>
        <HeroSection />
        <ReportShowcaseSection />
        <MethodologySection />
        <HowItWorksSection />
        <DiscoveriesSection />
        <TeamSection />
        <ServiceTiersSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer dark={dark} onToggle={() => setDarkOverride(!dark)} />
    </div>
  );
}
