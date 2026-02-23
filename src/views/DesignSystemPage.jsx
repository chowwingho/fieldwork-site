'use client'
import { useSyncExternalStore, useEffect } from "react";
import Sidebar from "../components/design-system/Sidebar";
import PrinciplesSection from "../components/design-system/PrinciplesSection";
import ColorSection from "../components/design-system/ColorSection";
import TypographySection from "../components/design-system/TypographySection";
import ButtonsSection from "../components/design-system/ButtonsSection";
import SpacingSection from "../components/design-system/SpacingSection";
import GridSection from "../components/design-system/GridSection";
import IconsSection from "../components/design-system/IconsSection";
import ShadowsSection from "../components/design-system/ShadowsSection";
import CardsSection from "../components/design-system/CardsSection";
import NavigationSection from "../components/design-system/NavigationSection";
import StatsSection from "../components/design-system/StatsSection";
import MarkersSection from "../components/design-system/MarkersSection";
import ResponsiveSection from "../components/design-system/ResponsiveSection";
import FormInputsSection from "../components/design-system/FormInputsSection";
import { MONO } from "../components/design-system/constants";

// External store for theme preference (localStorage-backed)
const themeListeners = new Set();
function emitThemeChange() {
  themeListeners.forEach((l) => l());
}
function subscribeTheme(callback) {
  themeListeners.add(callback);
  return () => themeListeners.delete(callback);
}
function getThemeSnapshot() {
  const stored = localStorage.getItem("ds-theme");
  if (stored) return stored === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function getServerThemeSnapshot() {
  return false;
}

export default function DesignSystemPage() {
  const dark = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);

  const toggleDark = () => {
    localStorage.setItem("ds-theme", dark ? "light" : "dark");
    emitThemeChange();
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    document.documentElement.classList.remove("dark");
    return () => document.documentElement.removeAttribute("data-theme");
  }, [dark]);

  return (
    <div
      className="min-h-screen transition-colors"
      style={{
        fontFamily: '"Geist Sans", sans-serif',
        background: "var(--mr-bg-page)",
        color: "var(--mr-text-primary)",
      }}
    >
      <Sidebar dark={dark} onToggle={toggleDark} />

      <main className="ml-[240px]">
        <div className="max-w-[1280px] mx-auto px-12">
          {/* Page header */}
          <header className="pt-16 pb-8">
            <h1
              className="text-[56px] font-medium leading-[1.2] tracking-tight mb-3"
              style={{ color: "var(--mr-text-primary)" }}
            >
              Many Roads &lt;AI&gt;
            </h1>
            <p
              className="text-[17px] leading-[1.6] max-w-[640px] mb-6"
              style={{ color: "var(--mr-text-muted)" }}
            >
              Living visual reference for all design tokens, typography,
              spacing, grid, and component patterns used in the V2 site. Built
              to keep the team aligned.
            </p>
            <div
              className="flex gap-6 text-[14px]"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              <span>v1.6</span>
              <span>2026-02-22</span>
              <span>Geist Sans + Geist Mono</span>
            </div>
          </header>

          {/* Foundations */}
          <PrinciplesSection />
          <ColorSection />
          <TypographySection />
          <SpacingSection />
          <ButtonsSection />
          <GridSection />
          <IconsSection />
          <ShadowsSection />

          {/* Components */}
          <CardsSection />
          <NavigationSection />
          <StatsSection />
          <MarkersSection />

          {/* Patterns */}
          <ResponsiveSection />
          <FormInputsSection />
        </div>

        {/* Page footer */}
        <footer
          className="mt-20 py-8 px-12"
          style={{
            borderTop: "1px solid var(--mr-border-default)",
            background: "var(--mr-bg-card)",
          }}
        >
          <div className="max-w-[1280px] mx-auto flex justify-between items-center">
            <span
              className="text-[14px]"
              style={{ color: "var(--mr-text-muted)" }}
            >
              Many Roads &lt;AI&gt; &mdash; Design System Reference v1.6
            </span>
            <span
              className="text-[14px]"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              2026-02-22
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
