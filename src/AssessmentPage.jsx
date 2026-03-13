'use client'
// Leading Intelligence — Assessment Page — v5.0
import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import SectionLabel from "./components/shared/SectionLabel";
import GhostButton from "./components/shared/GhostButton";
import { MONO } from "./components/shared/constants";

// =============================================================================
// PROMPT CONTENT (placeholder — replace with actual prompt text)
// =============================================================================

const PROMPT_1_TEXT = `# AI Readiness Assessment — Interview Prompt

## Role and context
You are an expert AI readiness consultant conducting a structured assessment of an engineering team's readiness to adopt AI coding tools effectively.

## Instructions
Walk the user through 31 structured questions across 4 categories: Artifacts, Process, Tooling, and Culture. For each question, accept their response and score it 0–3 based on the rubric provided below.

## Categories and areas
- Artifacts: Standards, Documentation, Requirements, Testing, Architecture
- Process: Reviews, Tech Debt, Security, Metrics
- Tooling: CI/CD, IDE
- Culture: Ownership, Decisions

[Full prompt content will be added here]`;

const PROMPT_2_TEXT = `# AI Readiness Report — Visualization Prompt

## Instructions
Take the assessment report provided below and transform it into an interactive HTML dashboard with the following sections:

1. A radar chart showing scores across the 4 main categories
2. A scored area breakdown with color-coded ratings
3. Visibility gaps — areas marked 'Not Sure'
4. Priority recommendations ranked by impact

## Format
Output a single, self-contained HTML file with embedded CSS and JavaScript.

[Full prompt content will be added here]`;

// =============================================================================
// PROMPT BLOCK COMPONENT
// =============================================================================

function PromptBlock({ number, title, filename, lineCount, description, version, promptText, toastMessage }) {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(promptText).then(() => {
      setCopied(true);
      setShowToast(true);
      setTimeout(() => {
        setCopied(false);
        setShowToast(false);
      }, 3000);
    });
  }

  const lines = promptText.split("\n");

  return (
    <div className="py-12 md:py-16">
      <div className="pt-12 md:pt-16" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
        <SectionLabel>// PROMPT_0{number}</SectionLabel>
        <h2 className="text-xl md:text-2xl font-medium mt-4 mb-6" style={{ color: "var(--mr-text-primary)" }}>
          Prompt {number} — {title}
        </h2>

        {/* Code block container */}
        <div
          className="overflow-hidden"
          style={{
            background: "var(--mr-bg-card)",
            border: "1px solid var(--mr-border-default)",
            borderRadius: "var(--mr-radius-lg)",
          }}
        >
          {/* Header bar */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid var(--mr-border-default)" }}
          >
            <span className="text-xs" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
              {filename}
            </span>
            <button
              onClick={handleCopy}
              data-event={`copy_prompt_${number}`}
              className="text-sm px-3 py-1.5 font-medium cursor-pointer"
              style={{
                ...MONO,
                background: "var(--mr-accent-default)",
                color: "var(--mr-accent-on)",
                borderRadius: "var(--mr-radius-sm)",
                border: "none",
                transition: "background-color var(--mr-transition-fast)",
              }}
            >
              {copied ? "Copied!" : "Copy prompt_"}
            </button>
          </div>

          {/* Code preview body */}
          <div className="relative" style={{ maxHeight: 200, overflow: "hidden" }}>
            <pre
              className="px-4 py-4 text-xs leading-6 overflow-x-auto"
              style={{ ...MONO, color: "var(--mr-text-muted)", margin: 0, background: "var(--mr-bg-code)" }}
            >
              {lines.slice(0, 12).map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span style={{ opacity: 0.3, userSelect: "none", minWidth: "1.5rem", textAlign: "right" }}>
                    {i + 1}
                  </span>
                  <span>{line || " "}</span>
                </div>
              ))}
            </pre>
            {/* Gradient fade */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
                background: "linear-gradient(to bottom, transparent, var(--mr-bg-code))",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Footer bar */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderTop: "1px solid var(--mr-border-default)" }}
          >
            <span className="text-xs" style={{ ...MONO, color: "var(--mr-text-muted)", opacity: 0.7 }}>
              ~{lineCount} lines · {description}
            </span>
            <span className="text-xs" style={{ ...MONO, color: "var(--mr-text-muted)", opacity: 0.7 }}>
              {version}
            </span>
          </div>
        </div>

        {/* Toast notification */}
        {showToast && (
          <div
            className="mr-toast mt-4 px-4 py-3 flex items-center gap-3"
            style={{ borderRadius: "var(--mr-radius-md)" }}
          >
            <span className="text-sm font-medium">✓</span>
            <span className="text-sm">{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// SECTIONS
// =============================================================================

function AssessmentHeader() {
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
          AI Readiness Assessment
        </h1>
        <p className="text-[17px] leading-[1.6] max-w-2xl mb-8" style={{ color: "var(--mr-text-muted)" }}>
          Two prompts. ~25 minutes. A complete picture of where your engineering team stands.
        </p>

        {/* Info pills */}
        <div className="flex flex-wrap gap-2">
          {["~25 min", "31 questions", "13 areas", "any LLM"].map((pill) => (
            <span
              key={pill}
              className="text-sm px-3 py-1"
              style={{
                ...MONO,
                background: "var(--mr-bg-card)",
                color: "var(--mr-text-muted)",
                borderRadius: "var(--mr-radius-sm)",
              }}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeYouBegin() {
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div
          className="rounded-lg p-6 md:p-8"
          style={{
            background: "var(--mr-bg-card)",
            border: "1px solid var(--mr-border-default)",
            borderRadius: "var(--mr-radius-md)",
          }}
        >
          <h2 className="text-xl font-medium mb-6" style={{ color: "var(--mr-text-primary)" }}>
            Before you begin
          </h2>
          <div className="flex flex-col gap-6">
            <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
              <strong style={{ color: "var(--mr-text-primary)" }}>Choose your AI.</strong>{" "}
              Works with Claude, ChatGPT, Gemini, or any model that handles long prompts. We recommend Claude or
              ChatGPT for the most consistent scoring.
            </p>
            <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
              <strong style={{ color: "var(--mr-text-primary)" }}>Run it solo or as a team.</strong>{" "}
              One person can complete it in ~25 minutes. For richer data, have 2–3 team members run it independently,
              then compare.
            </p>
            <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
              <strong style={{ color: "var(--mr-text-primary)" }}>Two prompts, two conversations.</strong>{" "}
              Prompt 1 is the interview. Prompt 2 visualizes your results. Run them in separate conversations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HandoffInstructions() {
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mr-border-dashed py-8 px-6 text-center flex flex-col items-center gap-4">
          <p className="text-sm font-medium" style={{ ...MONO, color: "var(--mr-accent-default)" }}>
            After completing the interview
          </p>
          <p className="text-2xl" style={{ color: "var(--mr-text-muted)", opacity: 0.4 }}>↓</p>
          <p className="text-[17px] leading-[1.6] max-w-lg" style={{ color: "var(--mr-text-muted)" }}>
            Your AI will generate a detailed markdown report with scores across all 13 areas. Copy the full report
            output, then open a new conversation and paste it along with{" "}
            <strong style={{ color: "var(--mr-text-primary)" }}>Prompt 2</strong> below.
          </p>
          <p className="text-2xl" style={{ color: "var(--mr-text-muted)", opacity: 0.4 }}>↓</p>
          <p className="text-sm font-medium" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
            Continue to Prompt 2
          </p>
        </div>
      </div>
    </section>
  );
}

function StayUpdated() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Email capture */}
            <div>
              <h2 className="text-xl font-medium mb-3" style={{ color: "var(--mr-text-primary)" }}>
                The framework evolves.
              </h2>
              <p className="text-[17px] leading-[1.6] mb-6" style={{ color: "var(--mr-text-muted)" }}>
                We update the assessment as we learn from more teams. Drop your email for updated prompts and
                benchmark data.
              </p>
              <div
                className="flex mb-2"
                style={{
                  border: "1px solid var(--mr-border-default)",
                  borderRadius: "var(--mr-radius-md)",
                  overflow: "hidden",
                }}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 text-sm outline-none min-w-0"
                  style={{
                    background: "var(--mr-bg-page)",
                    color: "var(--mr-text-primary)",
                    border: "none",
                  }}
                />
                <button
                  className="px-5 py-3 text-[13px] font-medium whitespace-nowrap cursor-pointer"
                  style={{
                    ...MONO,
                    background: "var(--mr-accent-default)",
                    color: "var(--mr-accent-on)",
                    border: "none",
                    transition: "background-color var(--mr-transition-fast)",
                  }}
                >
                  Subscribe_
                </button>
              </div>
              <p className="text-sm" style={{ color: "var(--mr-text-muted)", opacity: 0.7 }}>
                No spam. Updates only.
              </p>
            </div>

            {/* Gist links */}
            <div>
              <h2 className="text-xl font-medium mb-3" style={{ color: "var(--mr-text-primary)" }}>
                Prefer a raw file?
              </h2>
              <p className="text-[17px] leading-[1.6] mb-6" style={{ color: "var(--mr-text-muted)" }}>
                Both prompts are also available as GitHub Gists.
              </p>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-sm" style={{ ...MONO, color: "var(--mr-accent-default)" }}>
                  Prompt 1 — Assessment interview ↗
                </a>
                <a href="#" className="text-sm" style={{ ...MONO, color: "var(--mr-accent-default)" }}>
                  Prompt 2 — Report visualization ↗
                </a>
              </div>
              <p
                className="text-sm mt-4"
                style={{ color: "var(--mr-text-muted)", opacity: 0.7, fontStyle: "italic" }}
              >
                The gist README links back here for context.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UpsellNudge() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div
          className="rounded-lg p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          style={{
            background: "var(--mr-bg-card)",
            border: "1px solid var(--mr-border-default)",
            borderRadius: "var(--mr-radius-md)",
          }}
        >
          <p className="text-[17px] leading-[1.6] max-w-2xl" style={{ color: "var(--mr-text-muted)" }}>
            Ran the assessment? Our team can walk through your results, identify the highest-leverage improvements,
            and build a 90-day adoption roadmap with you.
          </p>
          <GhostButton href="#contact">Book a guided session_</GhostButton>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function AssessmentPage() {
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
        <AssessmentHeader />
        <BeforeYouBegin />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <PromptBlock
            number={1}
            title="Assessment interview"
            filename="assessment-interview.md"
            lineCount={320}
            description="assessment + scoring rubric"
            version="v1.0"
            promptText={PROMPT_1_TEXT}
            toastMessage="Copied! Paste this into a new conversation with your AI. Allow ~25 minutes."
          />
        </div>
        <HandoffInstructions />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <PromptBlock
            number={2}
            title="Report visualization"
            filename="report-visualization.md"
            lineCount={120}
            description="report to HTML dashboard converter"
            version="v1.0"
            promptText={PROMPT_2_TEXT}
            toastMessage="Copied! Open a new conversation, paste your assessment report, then paste this prompt."
          />
        </div>
        <StayUpdated />
        <UpsellNudge />
      </main>
      <Footer dark={dark} onToggle={() => setDarkOverride(!dark)} />
    </div>
  );
}
