'use client'
import { useState } from "react";
import Link from "next/link";
import Logo from "../Logo";
import { MONO } from "./constants";

const FOOTER_NAV = [
  { label: "--assessment", href: "/assessment" },
  { label: "--sample-report", href: "/sample-report" },
];

const FOOTER_SOCIAL = ["Twitter", "LinkedIn", "YouTube"];

export default function Footer({ dark, onToggle }) {
  const [email, setEmail] = useState("");

  return (
    <footer
      id="contact"
      className="py-16 md:py-20 lg:py-24"
      style={{ background: "var(--mr-footer-bg)", color: "var(--mr-footer-text)" }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-md mb-16">
          <Logo className="h-8 w-auto mb-3" style={{ color: "var(--mr-footer-text)" }} />
          <p className="text-sm leading-[1.6] mb-6" style={{ color: "var(--mr-footer-sub)" }}>
            AI readiness assessments for engineering teams navigating AI adoption.
          </p>
          <div className="mr-footer-input-wrap">
            <input
              className="mr-footer-input flex-1 px-4 py-3 text-sm outline-none min-w-0"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="mr-footer-subscribe px-5 py-3 text-[13px] font-medium whitespace-nowrap cursor-pointer" style={MONO}>
              Subscribe_
            </button>
          </div>
        </div>

        <div className="mb-12 md:mb-16 lg:mb-24" style={{ borderTop: "1px solid var(--mr-footer-divider)" }} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          {/* Contact */}
          <div>
            <p className="text-lg font-medium mb-2" style={{ color: "var(--mr-footer-sub)" }}>Email</p>
            <a
              href="mailto:hello@leadingintelligence.ai"
              className="text-lg font-medium hover:opacity-70 transition-opacity"
              style={{ color: "var(--mr-footer-text)" }}
            >
              hello@leadingintelligence.ai
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-lg font-medium mb-4" style={{ color: "var(--mr-footer-sub)" }}>Navigation</p>
            <div className="flex flex-col gap-2">
              {FOOTER_NAV.map((link) => (
                <Link key={link.href} href={link.href} className="text-lg font-medium mr-link-footer" style={MONO}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-lg font-medium mb-4" style={{ color: "var(--mr-footer-sub)" }}>Social</p>
            <div className="flex flex-col gap-2">
              {FOOTER_SOCIAL.map((link) => (
                <a key={link} href="#" className="text-lg font-medium mr-link-footer" style={MONO}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 flex flex-wrap items-center justify-between gap-6"
          style={{ borderTop: "1px solid var(--mr-footer-divider)" }}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: "var(--mr-status-positive)" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: "var(--mr-status-positive)" }}
              />
            </span>
            <span className="text-sm" style={{ ...MONO, color: "var(--mr-footer-sub)" }}>All systems operational</span>
          </div>
          <button
            onClick={onToggle}
            className="text-sm rounded-lg px-3 py-1 cursor-pointer"
            style={{
              ...MONO,
              color: "var(--mr-footer-text)",
              border: "1px solid var(--mr-footer-divider)",
              transition: "background-color 250ms ease, color 250ms ease",
            }}
          >
            {dark ? "[ light_ ]" : "[ dark_ ]"}
          </button>
        </div>
      </div>
    </footer>
  );
}
