'use client'
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { MONO } from "./constants";

const NAV_GROUPS = [
  {
    label: "OVERVIEW",
    items: [
      { id: "principles", label: "Principles" },
      { id: "looks-like-us", label: "Looks Like Us" },
    ],
  },
  {
    label: "FOUNDATIONS",
    items: [
      { id: "colors", label: "Colors" },
      { id: "typography", label: "Typography" },
      { id: "spacing", label: "Spacing" },
      { id: "buttons", label: "Buttons" },
      { id: "grid-layout", label: "Grid & Layout" },
      { id: "icons", label: "Icons" },
      { id: "shadows", label: "Shadows" },
    ],
  },
  {
    label: "COMPONENTS",
    items: [
      { id: "cards", label: "Cards" },
      { id: "navigation", label: "Navigation" },
      { id: "stats-row", label: "Stats Row" },
      { id: "section-markers", label: "Section Markers" },
    ],
  },
  {
    label: "PATTERNS",
    items: [
      { id: "responsive", label: "Responsive" },
      { id: "form-inputs", label: "Form Inputs" },
    ],
  },
  /* More PATTERNS sections planned: Section Anatomy, Page Layouts, Dark/Light Rules */
  /* BRAND group — add back when sections are built:
     Logo, Voice & Tone, Wordmark */
];

const ALL_IDS = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id));

export default function Sidebar({ dark, onToggle }) {
  const [activeId, setActiveId] = useState(ALL_IDS[0]);

  const updateActive = useCallback(() => {
    const threshold = window.innerHeight * 0.3;
    let current = ALL_IDS[0];
    for (const id of ALL_IDS) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          current = id;
        }
      }
    }
    setActiveId(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateActive, { passive: true });
    const rafId = requestAnimationFrame(updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      cancelAnimationFrame(rafId);
    };
  }, [updateActive]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside
      data-lenis-prevent
      className="fixed top-0 left-0 h-screen w-[240px] flex flex-col justify-between py-8 px-5 overflow-y-auto z-40"
      style={{
        background: "var(--mr-bg-card)",
        borderRight: "1px solid var(--mr-border-default)",
      }}
    >
      <div className="min-h-0 overflow-y-auto">
        {/* Back link */}
        <Link
          href="/v2"
          className="text-[13px] block mb-6 transition-colors hover:opacity-70"
          style={{ ...MONO, color: "var(--mr-text-muted)" }}
        >
          &larr; Back to site
        </Link>

        {/* Title */}
        <div className="mb-8">
          <span
            className="text-lg font-medium block mb-1"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            <span style={{ color: "var(--mr-accent-default)" }}>//</span> DESIGN_SYSTEM
          </span>
          <span
            className="text-[13px]"
            style={{ ...MONO, color: "var(--mr-text-muted)" }}
          >
            v1.6 &middot; 2026-02-22
          </span>
        </div>

        {/* Navigation groups */}
        <nav className="flex flex-col gap-5">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <span
                className="text-[11px] font-medium tracking-wider block mb-1.5 px-3"
                style={{ ...MONO, color: "var(--mr-text-muted)" }}
              >
                {group.label}
              </span>
              <div className="flex flex-col gap-0.5">
                {group.items.map(({ id, label }) => {
                  const isActive = activeId === id;
                  return (
                    <button
                      key={id}
                      onClick={() => scrollTo(id)}
                      className="text-left px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors cursor-pointer"
                      style={{
                        ...MONO,
                        color: isActive
                          ? "var(--mr-text-primary)"
                          : "var(--mr-text-muted)",
                        background: isActive
                          ? "var(--mr-bg-page)"
                          : "transparent",
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Dark mode toggle */}
      <button
        onClick={onToggle}
        className="text-[13px] px-3 py-1.5 rounded-md transition-colors self-start mt-6 cursor-pointer"
        style={{
          ...MONO,
          color: "var(--mr-text-muted)",
          border: "1px solid var(--mr-border-default)",
        }}
      >
        {dark ? "[ light_ ]" : "[ dark_ ]"}
      </button>
    </aside>
  );
}
