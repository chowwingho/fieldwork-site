'use client'
// Leading Intelligence — Sample Report Page — v5.0
import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import SectionLabel from "./components/shared/SectionLabel";
import SolidButton from "./components/shared/SolidButton";
import BrowserFrameMockup from "./components/shared/BrowserFrameMockup";
import { MONO } from "./components/shared/constants";

// =============================================================================
// DATA CONSTANTS
// =============================================================================

const ANNOTATION_CARDS = [
  {
    title: "Radar chart",
    desc: "Visual snapshot of balance across all four categories. See where you're strong and where you're exposed at a glance.",
  },
  {
    title: "Scored areas",
    desc: "13 areas rated individually. Color-coded so you can scan in seconds.",
  },
  {
    title: "Priority actions",
    desc: "Ranked recommendations specific to your results. Actionable within a quarter.",
  },
];

const REPORT_SECTIONS = [
  {
    num: "01",
    title: "Score Summary",
    desc: "Every area gets a score. Color-coded so you can scan the landscape in seconds — green where you're strong, red where you're exposed.",
  },
  {
    num: "02",
    title: "Detailed Findings",
    desc: "The AI doesn't just score — it explains why. Each area includes specific observations from your conversation, not generic advice.",
  },
  {
    num: "03",
    title: "Visibility Gaps",
    desc: "'Not Sure' answers aren't failures — they're blind spots worth investigating. The report flags them separately so they don't get lost in the scores.",
  },
  {
    num: "04",
    title: "Priority Recommendations",
    desc: "The report ends with what to do next — prioritized by impact, specific to your scores, and actionable within a quarter.",
  },
];

const DIFFERENTIATORS = [
  {
    title: "Calibrated rubric",
    desc: "The scoring criteria come from real consulting engagements — not a generic maturity model. Each area is weighted based on what actually matters for AI adoption.",
  },
  {
    title: "Conversational depth",
    desc: "The AI asks follow-up questions based on your answers. A 'Partial' on testing might prompt questions about which test types exist — surfacing nuance a form would miss.",
  },
  {
    title: "Visibility gaps",
    desc: "Most assessments penalize 'I don't know.' This one treats uncertainty as data. Blind spots flagged separately give you a second axis of insight beyond the score.",
  },
];

// =============================================================================
// SECTIONS
// =============================================================================

function SampleReportHeader() {
  return (
    <section className="pt-12 pb-8 md:pt-20 md:pb-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <Link href="/" className="text-sm mb-8 inline-block" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
          ← Back to Leading Intelligence
        </Link>

        <h1
          className="text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[1.1] tracking-tight mb-4"
          style={{ color: "var(--mr-text-primary)" }}
        >
          Sample Assessment Report
        </h1>
        <p className="text-[17px] leading-[1.6] max-w-2xl mb-8" style={{ color: "var(--mr-text-muted)" }}>
          See what you&rsquo;ll get after running the AI Readiness Assessment with your team.
        </p>

        {/* Fictional company banner */}
        <div
          className="rounded-lg p-5"
          style={{
            background: "var(--mr-bg-card)",
            borderLeft: "3px solid var(--mr-status-warning)",
            borderRadius: "var(--mr-radius-md)",
          }}
        >
          <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
            This report was generated for{" "}
            <strong style={{ color: "var(--mr-text-primary)" }}>Acme Engineering</strong>, a fictional 120-person
            startup. The scores and findings represent a typical assessment — your results will reflect your
            team&rsquo;s actual practices.
          </p>
        </div>
      </div>
    </section>
  );
}

function ReportEmbed() {
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Browser frame with gradient fade */}
        <div className="relative">
          <BrowserFrameMockup
            filename="acme-engineering-readiness-report.html"
            label="Acme Engineering — AI Readiness Report"
          />
          {/* Gradient fade with scroll hint */}
          <div
            className="flex items-end justify-center pb-3"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              background: "linear-gradient(to bottom, transparent, var(--mr-bg-page))",
              pointerEvents: "none",
            }}
          >
            <p className="text-xs text-center" style={{ ...MONO, color: "var(--mr-text-muted)", opacity: 0.5 }}>
              ↓ scroll for detailed findings, visibility gaps, recommendations ↓
            </p>
          </div>
        </div>

        {/* Annotation cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
    </section>
  );
}

function ReportSectionsWalkthrough() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// WHAT_THE_REPORT_COVERS</SectionLabel>
          <h2
            className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 mb-10"
            style={{ color: "var(--mr-text-primary)" }}
          >
            Four sections. Each one earns its place.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REPORT_SECTIONS.map((section) => (
              <div
                key={section.num}
                className="rounded-lg p-6 flex flex-col gap-4"
                style={{
                  background: "var(--mr-bg-card)",
                  border: "1px solid var(--mr-border-default)",
                  borderRadius: "var(--mr-radius-md)",
                }}
              >
                <div className="pb-4" style={{ borderBottom: "1px solid var(--mr-border-default)" }}>
                  <span className="text-sm font-medium" style={{ ...MONO, color: "var(--mr-accent-default)" }}>
                    ({section.num})
                  </span>
                </div>
                <h3 className="text-xl font-medium" style={{ color: "var(--mr-text-primary)" }}>
                  {section.title}
                </h3>
                <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                  {section.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DifferentiatorsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// NOT_A_GENERIC_QUIZ</SectionLabel>
          <h2
            className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 mb-10"
            style={{ color: "var(--mr-text-primary)" }}
          >
            What makes this different.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map((d) => (
              <div
                key={d.title}
                className="rounded-lg p-6 flex flex-col gap-4"
                style={{
                  background: "var(--mr-bg-card)",
                  border: "1px solid var(--mr-border-default)",
                  borderRadius: "var(--mr-radius-md)",
                }}
              >
                <h3 className="text-xl font-medium" style={{ color: "var(--mr-text-primary)" }}>
                  {d.title}
                </h3>
                <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SampleReportCta() {
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
            See where your team actually stands.
          </h2>
          <p className="text-[17px] leading-[1.6] max-w-xl" style={{ color: "var(--mr-text-muted)" }}>
            The assessment takes ~25 minutes and works with any AI assistant. You&rsquo;ll get a scored report and
            interactive dashboard — just like the one above, but with your team&rsquo;s real data.
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

export default function SampleReportPage() {
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
        <SampleReportHeader />
        <ReportEmbed />
        <ReportSectionsWalkthrough />
        <DifferentiatorsSection />
        <SampleReportCta />
      </main>
      <Footer dark={dark} onToggle={() => setDarkOverride(!dark)} />
    </div>
  );
}
