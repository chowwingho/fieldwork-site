import { useState, useEffect, useRef, useCallback } from "react";

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

const PROJECTS = [
  { year: "2025", name: "Horizon Pavilion", type: "Cultural Architecture", thumb: 0 },
  { year: "2025", name: "Atlas Corporate Center", type: "Commercial Architecture", thumb: 1 },
  { year: "2024", name: "Casa Ladera", type: "Residential Architecture", thumb: 2 },
  { year: "2023", name: "Horizon Tower", type: "Commercial Architecture", thumb: 3 },
  { year: "2022", name: "Pavilion Arts Center", type: "Cultural Architecture", thumb: 4 },
  { year: "2022", name: "Riverline Residences", type: "Residential Architecture", thumb: 5 },
];

const TESTIMONIALS = [
  {
    quote:
      "Fieldwork guided our project with remarkable clarity and vision. Their team understood not only the architecture but also the business goals behind it, making them an invaluable partner.",
    name: "Sarah Mitchell",
    role: "Director, Horizon Development Group",
  },
  {
    quote:
      "Working with Fieldwork was seamless from start to finish. Their approach is refined, precise, and deeply thoughtful\u2014our institution now has a space that truly embodies its mission.",
    name: "David Romero",
    role: "Founder, Romero & Associates Cultural Projects",
  },
];

const FAQ_ITEMS = [
  "What types of projects does Fieldwork take on?",
  "How early should we involve Fieldwork in our project?",
  "Do you only work with large-scale clients?",
  "How does Fieldwork approach sustainability?",
  "What does your process look like?",
  "Do you manage construction as well?",
  "How do we get started with Fieldwork?",
];

const NAV_LINKS = ["Trailhead", "Wayfinder", "Team", "Contact"];
const FOOTER_NAV = ["Trailhead", "Wayfinder", "Team", "Contact"];
const FOOTER_SOCIAL = ["Twitter", "Instagram", "YouTube"];

// =============================================================================
// ICONS
// =============================================================================
function ArrowIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.33 12.67L12.67 3.33M12.67 3.33H5.33M12.67 3.33V10.67"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ open, className = "w-6 h-6" }) {
  return (
    <svg
      className={`${className} transition-transform duration-300 ${open ? "rotate-45" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// =============================================================================
// FONT STYLES
// =============================================================================
const MONO = { fontFamily: '"Geist Mono", monospace' };

// =============================================================================
// SHARED COMPONENTS
// =============================================================================
function SectionLabel({ children, align = "left" }) {
  return (
    <span className={`text-lg font-medium text-[#262625] dark:text-[#ECECEA] tracking-normal whitespace-nowrap ${align === "right" ? "text-right" : ""}`} style={MONO}>
      {children}
    </span>
  );
}

function SecondaryLink({ children, color = "dark" }) {
  const textColor = color === "dark" ? "text-[#262625] dark:text-[#ECECEA]" : "text-white";
  return (
    <a href="#" className={`inline-flex items-center gap-1.5 text-lg font-medium ${textColor} group`} style={MONO}>
      <span>{children}</span>
      <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function PrimaryButton({ children }) {
  return (
    <a
      href="#"
      className="group inline-flex items-center gap-2 bg-[#E8E6DD] dark:bg-[#333331] text-[#262625] dark:text-[#ECECEA] px-4 py-2 rounded-lg text-lg font-medium hover:bg-[#DEDAD0] dark:hover:bg-[#3D3D3A] transition-colors w-fit"
      style={MONO}
    >
      <span>{children}</span>
    </a>
  );
}

const HERO_PHRASES = ["See where you stand", "Run the assessment", "Start here"];

function TypewriterButton() {
  const [text, setText] = useState("");
  const [paused, setPaused] = useState(false);
  const phase = useRef("typing"); // typing | pause | erasing | pauseNext
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const timer = useRef(null);

  const tick = useCallback(() => {
    const current = HERO_PHRASES[phraseIdx.current];

    if (phase.current === "typing") {
      charIdx.current++;
      setText(current.slice(0, charIdx.current));
      if (charIdx.current >= current.length) {
        phase.current = "pause";
        setPaused(true);
        timer.current = setTimeout(tick, 4000);
      } else {
        timer.current = setTimeout(tick, 50);
      }
    } else if (phase.current === "pause") {
      phase.current = "erasing";
      setPaused(false);
      timer.current = setTimeout(tick, 30);
    } else if (phase.current === "erasing") {
      charIdx.current--;
      setText(current.slice(0, charIdx.current));
      if (charIdx.current <= 0) {
        phase.current = "pauseNext";
        timer.current = setTimeout(tick, 600);
      } else {
        timer.current = setTimeout(tick, 30);
      }
    } else if (phase.current === "pauseNext") {
      phraseIdx.current = (phraseIdx.current + 1) % HERO_PHRASES.length;
      phase.current = "typing";
      setPaused(false);
      timer.current = setTimeout(tick, 50);
    }
  }, []);

  useEffect(() => {
    phase.current = "typing";
    charIdx.current = 0;
    setText("");
    timer.current = setTimeout(tick, 400);
    return () => clearTimeout(timer.current);
  }, [tick]);

  return (
    <a
      href="#"
      className="inline-flex items-center text-left bg-[#E8E6DD] dark:bg-[#333331] text-[#262625] dark:text-[#ECECEA] px-4 py-2 rounded-lg text-lg font-medium hover:bg-[#DEDAD0] dark:hover:bg-[#3D3D3A] transition-colors"
      style={MONO}
    >
      {text}
      <span className={paused ? "blink-cursor" : "opacity-0"}>_</span>
    </a>
  );
}

// =============================================================================
// SECTIONS
// =============================================================================
function Navbar({ dark, onToggle }) {
  return (
    <nav className="bg-[#FAF9F6] dark:bg-[#1A1A18] sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-12 flex items-center justify-between h-[77px]">
        <span className="text-lg font-medium text-[#262625] dark:text-[#ECECEA] tracking-wide" style={MONO}>Many_Roads &lt;AI&gt;</span>
        <div className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-lg font-medium text-[#888888] dark:text-[#ECECEA]/50 hover:text-[#262625] dark:hover:text-[#ECECEA] transition-colors"
              style={MONO}
            >
              {link}
            </a>
          ))}
          <button
            onClick={onToggle}
            className="text-sm text-[#888888] dark:text-[#ECECEA]/50 hover:text-[#262625] dark:hover:text-[#ECECEA] border border-[#262625]/12 dark:border-[#ECECEA]/10 rounded-lg px-3 py-1 hover:bg-[#F0EEE6] dark:hover:bg-[#262624] transition-colors"
            style={MONO}
          >
            {dark ? "[ light_ ]" : "[ dark_ ]"}
          </button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="pt-16 pb-16">
      <div className="max-w-[1280px] mx-auto px-12">
        <div className="grid grid-cols-2 gap-16">
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl font-medium leading-[1.2] tracking-tight text-[#262625] dark:text-[#ECECEA]">
              You bought your team AI coding tools six months ago. They&rsquo;re still not faster.
            </h1>
            <div className="flex items-center gap-6">
              <TypewriterButton />
              <a href="#" className="text-lg font-medium text-[#888888] dark:text-[#ECECEA]/50 underline underline-offset-4 hover:text-[#262625] dark:hover:text-[#ECECEA] transition-colors" style={MONO}>
                or talk to our team
              </a>
            </div>
          </div>
          <div className="flex items-end">
            <p className="text-lg leading-[1.6] text-[#888888] dark:text-[#ECECEA]/50">
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
    <section className="py-32">
      <div className="max-w-[1280px] mx-auto px-12">
      <div className="grid grid-cols-2 gap-16 mb-24">
        <div>
          <SectionLabel>// 01 &mdash; THE_PROBLEM</SectionLabel>
          <h2 className="text-[40px] font-medium leading-[1.2] text-[#262625] dark:text-[#ECECEA] mt-12">
            Every AI vendor is selling the same story. Here&rsquo;s what actually happened.
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-lg leading-[1.6] text-[#262625] dark:text-[#ECECEA]">
            Your senior engineers tried the suggestions for a few weeks. Found them wrong more
            often than useful&nbsp;&mdash; because the tool doesn&rsquo;t know your codebase. They
            quietly went back to how they worked before.
          </p>
          <p className="text-lg leading-[1.6] text-[#262625] dark:text-[#ECECEA]">
            Your junior engineers kept accepting suggestions. The code looks right, passes review,
            and doesn&rsquo;t follow any of your architectural patterns. That debt is compounding.
            You just can&rsquo;t see it yet.
          </p>
          <p className="text-lg leading-[1.6] text-[#262625] dark:text-[#ECECEA]">
            And the dashboards leadership tracks&nbsp;&mdash; seat activations, suggestion acceptance
            rates, lines generated&nbsp;&mdash; don&rsquo;t correlate with anything that matters.
          </p>
          <p className="text-lg leading-[1.6] text-[#262625] dark:text-[#ECECEA] mt-8">
            The problem was never the tools. Most AI coding tools were designed for greenfield
            projects and demo-ready codebases. Not the complex, layered, sometimes-ugly systems
            that real teams maintain. Making them productive in your environment requires work
            nobody wants to talk about: deep configuration, codebase-specific context, workflow
            integration, and engineers who know what they&rsquo;re doing.
          </p>
          <p className="text-xl font-medium leading-[1.6] text-[#262625] dark:text-[#ECECEA] mt-4">
            That&rsquo;s the work we do.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="text-5xl font-medium tracking-tight text-[#262625] dark:text-[#ECECEA] mb-4">{stat.value}</p>
            <p className="text-lg font-medium text-[#262625] dark:text-[#ECECEA] mb-2">{stat.label}</p>
            <p className="text-lg leading-[1.6] text-[#888888] dark:text-[#ECECEA]/50">{stat.desc}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="py-32">
      <div className="max-w-[1280px] mx-auto px-12">
        <div className="border-t border-[#262625]/12 dark:border-[#ECECEA]/10 pt-24">
          <div className="grid grid-cols-5 gap-x-8">
            {/* Label in col 1 */}
            <div className="col-span-1">
              <SectionLabel>// 02 &mdash; WHY_TEAMS_STALL</SectionLabel>
            </div>
            {/* Empty col 2 acts as gutter */}
            <div className="col-span-1" />
            {/* Content spans cols 3-5 */}
            <div className="col-span-3">
              <h2 className="text-[40px] font-medium leading-[1.2] text-[#262625] dark:text-[#ECECEA] mb-16">
                If any of this sounds familiar, you&rsquo;re not alone.
              </h2>
              <div className="grid grid-cols-2 gap-x-16 gap-y-20">
                {SERVICES.map((service) => (
                  <div key={service.num} className="border-t border-[#262625]/12 dark:border-[#ECECEA]/10 pt-8">
                    <span className="text-lg font-medium text-[#262625] dark:text-[#ECECEA] block mb-3">
                      ({service.num})
                    </span>
                    <h3 className="text-lg font-medium text-[#262625] dark:text-[#ECECEA] mb-4">{service.title}</h3>
                    <p className="text-lg leading-[1.6] text-[#888888] dark:text-[#ECECEA]/50">{service.desc}</p>
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
    <section className="py-32">
      <div className="max-w-[1280px] mx-auto px-12">
        <div className="border-t border-[#262625]/12 dark:border-[#ECECEA]/10 pt-24">
          <div className="grid grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-[40px] font-medium leading-[1.2] text-[#262625] dark:text-[#ECECEA] mb-6">
                Two ways to start. Zero decks required.
              </h2>
              <p className="text-lg leading-[1.6] text-[#888888] dark:text-[#ECECEA]/50">
                Whether you need to understand where you stand or you&rsquo;re ready for hands-on
                help, we&rsquo;ve built entry points that respect your time. One is free. Both are
                built by engineers who&rsquo;ve done this before.
              </p>
            </div>
            <div className="flex items-end justify-end">
              <SectionLabel align="right">// 03 &mdash; TWO_PATHWAYS</SectionLabel>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {/* Trailhead */}
            <div className="bg-[#F0EEE6] dark:bg-[#262624] rounded-lg p-10 flex flex-col">
              <h3 className="text-2xl font-medium text-[#262625] dark:text-[#ECECEA] mb-4">Trailhead</h3>
              <p className="text-lg font-medium leading-[1.6] text-[#262625] dark:text-[#ECECEA] mb-4">
                Find out where you actually stand.
              </p>
              <p className="text-lg leading-[1.6] text-[#888888] dark:text-[#ECECEA]/50 mb-4">
                A free, open-source assessment that evaluates your engineering org across four
                dimensions: codebase compatibility, tool configuration, team workflows, and
                organizational process.
              </p>
              <p className="text-lg leading-[1.6] text-[#888888] dark:text-[#ECECEA]/50 mb-8">
                Not a marketing quiz. Not a lead-gen form. You&rsquo;ll get a detailed score with
                specific, actionable findings&nbsp;&mdash; whether or not you ever talk to us.
              </p>
              <div className="mt-auto flex flex-col gap-4">
                <a href="#" className="inline-flex bg-[#D1CFC6] dark:bg-[#3D3D3A] text-[#262625] dark:text-[#ECECEA] px-4 py-2 rounded-lg text-lg font-medium hover:bg-[#C5C3BA] dark:hover:bg-[#4A4A47] transition-colors w-fit" style={MONO}>
                  Run the assessment<span className="blink-cursor">_</span>
                </a>
                <a href="#" className="text-lg font-medium text-[#888888] dark:text-[#ECECEA]/50 underline underline-offset-4 hover:text-[#262625] dark:hover:text-[#ECECEA] transition-colors w-fit" style={MONO}>
                  or talk to our team
                </a>
              </div>
            </div>
            {/* Wayfinder */}
            <div className="bg-[#F0EEE6] dark:bg-[#262624] rounded-lg p-10 flex flex-col">
              <h3 className="text-2xl font-medium text-[#262625] dark:text-[#ECECEA] mb-4">Wayfinder</h3>
              <p className="text-lg font-medium leading-[1.6] text-[#262625] dark:text-[#ECECEA] mb-4">
                Get engineers in the room, not slides.
              </p>
              <p className="text-lg leading-[1.6] text-[#888888] dark:text-[#ECECEA]/50 mb-4">
                Hands-on consulting and training delivered by people who&rsquo;ve built and led teams
                like yours. We work with your actual codebase, your real workflows, and your specific
                tools.
              </p>
              <p className="text-lg leading-[1.6] text-[#888888] dark:text-[#ECECEA]/50 mb-8">
                Some teams need a focused sprint to configure and optimize. Others need a longer
                engagement to change how their org works with AI-assisted development. Either way, we
                start from where you are.
              </p>
              <div className="mt-auto flex flex-col gap-4">
                <a href="#" className="inline-flex bg-[#D1CFC6] dark:bg-[#3D3D3A] text-[#262625] dark:text-[#ECECEA] px-4 py-2 rounded-lg text-lg font-medium hover:bg-[#C5C3BA] dark:hover:bg-[#4A4A47] transition-colors w-fit" style={MONO}>
                  Learn more about Wayfinder<span className="blink-cursor">_</span>
                </a>
                <a href="#" className="text-lg font-medium text-[#888888] dark:text-[#ECECEA]/50 underline underline-offset-4 hover:text-[#262625] dark:hover:text-[#ECECEA] transition-colors w-fit" style={MONO}>
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
    <section className="py-32">
      <div className="max-w-[1280px] mx-auto px-12">
        <div className="border-t border-[#262625]/12 dark:border-[#ECECEA]/10 pt-24">
          <div className="grid grid-cols-2 gap-16">
            <div>
              <SectionLabel>// 04 &mdash; THE_TEAM</SectionLabel>
              <h2 className="text-[40px] font-medium leading-[1.2] text-[#262625] dark:text-[#ECECEA] mt-12">
                Built by engineers, for engineering teams.
              </h2>
            </div>
            <div>
              <p className="text-lg leading-[1.6] text-[#888888] dark:text-[#ECECEA]/50 mb-10">
                Founded by engineering leaders who&rsquo;ve spent their careers building, scaling,
                and leading the kinds of teams navigating this right now.
              </p>
              <div className="border-t border-[#262625]/12 dark:border-[#ECECEA]/10 pt-10 flex flex-col gap-10">
                <div>
                  <p className="text-lg font-medium text-[#262625] dark:text-[#ECECEA] mb-2">Susan &mdash; Director of Engineering</p>
                  <p className="text-lg leading-[1.6] text-[#888888] dark:text-[#ECECEA]/50">
                    PhD in software engineering. Former McKinsey. Has led engineering orgs through
                    complex technical transformations and knows the distance between strategy and
                    execution from both sides.
                  </p>
                  <a href="#" className="text-sm text-[#888888] dark:text-[#ECECEA]/50 hover:text-[#262625] dark:hover:text-[#ECECEA] transition-colors mt-2 inline-block" style={MONO}>LinkedIn &#8599;</a>
                </div>
                <div>
                  <p className="text-lg font-medium text-[#262625] dark:text-[#ECECEA] mb-2">Jeff &mdash; VP of Engineering</p>
                  <p className="text-lg leading-[1.6] text-[#888888] dark:text-[#ECECEA]/50">
                    15+ years leading engineering teams. Has been the buyer, the budget owner, and
                    the person who had to explain ROI on tooling investments to the board. Knows
                    what your seat feels like.
                  </p>
                  <a href="#" className="text-sm text-[#888888] dark:text-[#ECECEA]/50 hover:text-[#262625] dark:hover:text-[#ECECEA] transition-colors mt-2 inline-block" style={MONO}>LinkedIn &#8599;</a>
                </div>
                <div>
                  <p className="text-lg font-medium text-[#262625] dark:text-[#ECECEA] mb-2">Spencer &mdash; Senior Software Engineer</p>
                  <p className="text-lg leading-[1.6] text-[#888888] dark:text-[#ECECEA]/50">
                    10+ years in real codebases, every day. Brings implementation-level understanding
                    of what actually happens when AI tools meet legacy systems, real-world constraints,
                    and engineering workflows that weren&rsquo;t designed for them.
                  </p>
                  <a href="#" className="text-sm text-[#888888] dark:text-[#ECECEA]/50 hover:text-[#262625] dark:hover:text-[#ECECEA] transition-colors mt-2 inline-block" style={MONO}>LinkedIn &#8599;</a>
                </div>
              </div>
              <div className="border-t border-[#262625]/12 dark:border-[#ECECEA]/10 mt-10 pt-10">
                <p className="text-lg italic text-[#262625] dark:text-[#ECECEA] mb-8">
                  We&rsquo;re not consultants who read about your problems. We&rsquo;ve had them.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["TypeScript", "Python", "Go", "Rust", "React", "Node.js", "AWS", "LLMs"].map((badge) => (
                    <span key={badge} className="inline-flex bg-[#F0EEE6] dark:bg-[#262624] rounded-full px-3 py-1 text-sm text-[#262625] dark:text-[#ECECEA]" style={MONO}>
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
    <section className="py-32">
      <div className="max-w-[1280px] mx-auto px-12">
        <div className="border-t border-[#262625]/12 dark:border-[#ECECEA]/10 pt-24">
          <div className="grid grid-cols-[250px_1fr] gap-16">
            <div>
              <SectionLabel>// 05 &mdash; WHY_TRUST_US</SectionLabel>
            </div>
            <div>
              <h2 className="text-[40px] font-medium leading-[1.2] text-[#262625] dark:text-[#ECECEA] mb-4">
                We lead with transparency, not promises.
              </h2>
              <p className="text-lg leading-[1.6] text-[#888888] dark:text-[#ECECEA]/50 mb-12">
                We&rsquo;re a small, focused team. That&rsquo;s a strength, not a weakness.
                Here&rsquo;s how we build confidence without overpromising.
              </p>
              <div className="border-t border-[#262625]/12 dark:border-[#ECECEA]/10 pt-12">
                <div className="grid grid-cols-2 gap-16">
                  <div>
                    <p className="text-lg font-medium text-[#262625] dark:text-[#ECECEA] mb-3">Methodology</p>
                    <p className="text-lg leading-[1.6] text-[#888888] dark:text-[#ECECEA]/50">
                      Our assessment framework draws on established models including the MITRE AI
                      Maturity Model, adapted specifically for AI-assisted software development in
                      production codebases.
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-[#262625] dark:text-[#ECECEA] mb-3">Open source</p>
                    <p className="text-lg leading-[1.6] text-[#888888] dark:text-[#ECECEA]/50">
                      Trailhead is open source. Not because it&rsquo;s a marketing strategy. Because
                      the fastest way to earn an engineer&rsquo;s trust is to show them how you think.
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-[#262625] dark:text-[#ECECEA] mb-3">Focus</p>
                    <p className="text-lg leading-[1.6] text-[#888888] dark:text-[#ECECEA]/50">
                      We work exclusively with engineering teams at Series B&ndash;D technology
                      companies navigating AI-assisted development in established codebases. Narrow
                      focus. Intentional.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-[#262625]/12 dark:border-[#ECECEA]/10 mt-12 pt-12">
                <div className="grid grid-cols-2 gap-16">
                  <div>
                    <p className="text-2xl font-medium leading-[1.4] text-[#262625] dark:text-[#ECECEA] mb-8">
                      &ldquo;We&rsquo;d burned through six months of Copilot licenses before they
                      showed us what was actually happening. Within two weeks, our senior engineers
                      were using it again&nbsp;&mdash; and this time it was actually helping.&rdquo;
                    </p>
                    <p className="text-lg text-[#262625] dark:text-[#ECECEA]">VP of Engineering</p>
                    <p className="text-lg text-[#888888] dark:text-[#ECECEA]/50">Series C, Fintech &mdash; 120 engineers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-medium leading-[1.4] text-[#262625] dark:text-[#ECECEA] mb-8">
                      &ldquo;They didn&rsquo;t pitch us a deck. They opened our codebase, ran their
                      assessment, and showed us exactly where our AI tooling was falling down. First
                      time anyone made it that concrete.&rdquo;
                    </p>
                    <p className="text-lg text-[#262625] dark:text-[#ECECEA]">Director of Platform Engineering</p>
                    <p className="text-lg text-[#888888] dark:text-[#ECECEA]/50">Series D, SaaS &mdash; 85 engineers</p>
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

function Footer() {
  return (
    <footer className="bg-[#262625] dark:bg-[#111110] text-white py-24">
      <div className="max-w-[1280px] mx-auto px-12">
        <div className="max-w-2xl mb-8">
          <h2 className="text-[40px] font-medium leading-[1.2]">
            Every team&rsquo;s path to productive AI-assisted development looks different.
          </h2>
          <p className="text-[40px] font-medium leading-[1.2] mt-2">
            Let&rsquo;s figure out yours.
          </p>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <a
            href="#"
            className="inline-flex bg-[#E8E6DD] dark:bg-[#333331] text-[#262625] dark:text-[#ECECEA] px-4 py-2 rounded-lg text-lg font-medium hover:bg-[#DEDAD0] dark:hover:bg-[#3D3D3A] transition-colors w-fit"
            style={MONO}
          >
            Run Trailhead &mdash; see where your team stands<span className="blink-cursor">_</span>
          </a>
          <a
            href="#"
            className="inline-flex bg-[#E8E6DD] dark:bg-[#333331] text-[#262625] dark:text-[#ECECEA] px-4 py-2 rounded-lg text-lg font-medium hover:bg-[#DEDAD0] dark:hover:bg-[#3D3D3A] transition-colors w-fit"
            style={MONO}
          >
            Book a conversation about Wayfinder<span className="blink-cursor">_</span>
          </a>
        </div>
        <p className="text-lg leading-[1.6] text-white/60 mb-16">
          30 minutes. No pitch deck. Just your setup, your challenges, and a straight answer
          on whether we can help.
        </p>
        <div className="border-t border-white/15 mb-16" />
        <div className="grid grid-cols-3 gap-16">
          {/* Contact info */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-lg font-medium text-[#888888] mb-2">Email</p>
              <a
                href="mailto:hello@manyroads.ai"
                className="text-lg font-medium text-white hover:opacity-70 transition-opacity"
              >
                hello@manyroads.ai
              </a>
            </div>
            <div>
              <p className="text-lg font-medium text-[#888888] mb-2">Phone</p>
              <a
                href="tel:+15551234567"
                className="text-lg font-medium text-white hover:opacity-70 transition-opacity"
              >
                +1 (555) 123-4567
              </a>
            </div>
          </div>
          {/* Navigation */}
          <div>
            <p className="text-lg font-medium text-[#888888] mb-4">Navigation</p>
            <div className="flex flex-col gap-2">
              {FOOTER_NAV.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-lg font-medium text-white hover:opacity-70 transition-opacity"
                  style={MONO}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          {/* Social */}
          <div>
            <p className="text-lg font-medium text-[#888888] mb-4">Social</p>
            <div className="flex flex-col gap-2">
              {FOOTER_SOCIAL.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-lg font-medium text-white hover:opacity-70 transition-opacity"
                  style={MONO}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Large wordmark */}
        <div className="mt-24">
          <p className="text-[clamp(80px,15vw,200px)] font-medium leading-none tracking-tight">
            MANYROADS
          </p>
        </div>
      </div>
    </footer>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function FieldworkV2() {
  const [dark, setDark] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1A18] min-h-screen transition-colors" style={{ fontFamily: '"Geist Sans", sans-serif' }}>
      <Navbar dark={dark} onToggle={() => setDark(!dark)} />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PathwaysSection />
        <TeamSection />
        <CredibilitySection />
      </main>
      <Footer />
    </div>
  );
}
