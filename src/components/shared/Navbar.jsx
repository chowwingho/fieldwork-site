'use client'
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "../Logo";
import { MONO } from "./constants";

const NAV_LINKS = [
  { label: "--assessment", href: "/assessment" },
  { label: "--sample-report", href: "/sample-report" },
];

export default function Navbar({ dark, onToggle }) {
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
    <nav
      className="sticky top-0 z-50"
      style={{ background: "var(--mr-bg-page)", borderBottom: "1px solid var(--mr-border-default)" }}
      ref={menuRef}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/">
          <Logo className="h-6 md:h-7 w-auto" style={{ color: "var(--mr-text-primary)" }} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium mr-link-nav"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: dark toggle + CTA + hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggle}
            className="hidden md:inline-flex text-sm mr-btn-toggle rounded-lg px-3 py-1.5 cursor-pointer"
            style={MONO}
          >
            {dark ? "[ light_ ]" : "[ dark_ ]"}
          </button>
          <Link
            href="/assessment"
            className="hidden md:inline-flex items-center mr-btn-primary px-5 py-2.5 rounded-lg text-base font-medium w-fit"
            style={MONO}
          >
            Get the prompt_
          </Link>
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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium py-2 mr-link-nav"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/assessment"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center mr-btn-primary px-5 py-2.5 rounded-lg text-base font-medium w-fit mt-2"
            style={MONO}
          >
            Get the prompt_
          </Link>
          <button
            onClick={onToggle}
            className="text-sm mr-btn-toggle rounded-lg px-3 py-1.5 w-fit cursor-pointer"
            style={MONO}
          >
            {dark ? "[ light_ ]" : "[ dark_ ]"}
          </button>
        </div>
      )}
    </nav>
  );
}
