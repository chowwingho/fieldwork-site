import { useState } from "react";

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
    value: "20+",
    label: "Years of experience",
    desc: "Designing spaces that combine function and beauty.",
  },
  {
    value: "100+",
    label: "Completed projects",
    desc: "Across residential, commercial, and cultural sectors.",
  },
  {
    value: "85%",
    label: "Repeat clients",
    desc: "Reflecting long-term trust and lasting relationships.",
  },
  {
    value: "12",
    label: "Countries served",
    desc: "Delivering projects with global reach and local sensitivity.",
  },
];

const SERVICES = [
  {
    num: "01",
    title: "Architectural design",
    desc: "We develop thoughtful concepts and schematics that integrate form, function, and context across residential, commercial, and cultural projects.",
  },
  {
    num: "02",
    title: "Interior architecture",
    desc: "We craft tailored interior environments with careful attention to materiality, spatial flow, and custom detailing that reflect the identity of each client.",
  },
  {
    num: "03",
    title: "Urban and landscape design",
    desc: "We plan and shape public spaces, parks, and outdoor environments, applying sustainable and context-driven solutions that enrich communities.",
  },
  {
    num: "04",
    title: "Project delivery and consultancy",
    desc: "We provide detailed documentation, construction management, and long-term advisory, ensuring projects are delivered to the highest standard.",
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

const NAV_LINKS = ["Home", "Work", "Services", "About"];
const FOOTER_NAV = ["Home", "Work", "Services", "About", "Contact"];
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
// SHARED COMPONENTS
// =============================================================================
function SectionLabel({ children, align = "left" }) {
  return (
    <span className={`text-lg font-medium text-[#262625] tracking-normal whitespace-nowrap ${align === "right" ? "text-right" : ""}`}>
      {children}
    </span>
  );
}

function SecondaryLink({ children, color = "dark" }) {
  const textColor = color === "dark" ? "text-[#262625]" : "text-white";
  return (
    <a href="#" className={`inline-flex items-center gap-1.5 text-lg font-medium ${textColor} group`}>
      <span>{children}</span>
      <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function PrimaryButton({ children }) {
  return (
    <a
      href="#"
      className="group inline-flex items-center gap-2 bg-[#F0EFEC] text-[#262625] px-4 py-2 rounded-lg text-lg font-medium hover:bg-[#E5E4E1] transition-colors w-fit"
    >
      <span>{children}</span>
      <ArrowIcon className="w-4 h-4 transition-transform duration-200 ease-in-out group-hover:rotate-45" />
    </a>
  );
}

// =============================================================================
// SECTIONS
// =============================================================================
function Navbar() {
  return (
    <nav className="bg-[#FAF9F6] sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-12 flex items-center justify-between h-[77px]">
        <span className="text-lg font-medium text-[#262625] tracking-wide">FIELDWORK&reg;</span>
        <div className="flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              className={`text-lg font-medium ${i === 0 ? "text-[#262625]" : "text-[#262625/60]"} hover:text-[#262625] transition-colors`}
            >
              {link}
            </a>
          ))}
          <a href="#" className="text-lg font-medium text-[#262625] hover:opacity-70 transition-opacity">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="pt-16 pb-32">
      <div className="max-w-[1280px] mx-auto px-12">
        <div className="grid grid-cols-2 gap-16 mb-24">
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl font-medium leading-[1.2] tracking-tight text-[#262625]">
              We design spaces that balance function and timeless beauty.
            </h1>
            <PrimaryButton>Get template</PrimaryButton>
          </div>
          <div className="flex items-end">
            <p className="text-lg leading-[1.6] text-[#262625]">
              At Fieldwork, architecture is guided by precision and restraint. Our work blends modern
              aesthetics with human-centered design, creating spaces that endure. From residential and
              commercial projects to cultural landmarks, we focus on delivering environments that
              integrate seamlessly with their context and stand the test of time.
            </p>
          </div>
        </div>
        <div className="w-full aspect-[16/7] rounded-lg overflow-hidden">
          <img
            src={ASSETS.heroImage}
            alt="Modern architecture with blue glass facade"
            className="w-full h-full object-cover"
          />
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
          <SectionLabel>(FW 02) &mdash; ABOUT</SectionLabel>
          <h2 className="text-[40px] font-medium leading-[1.2] text-[#262625] mt-12">
            Architecture that stands for clarity and purpose.
          </h2>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <p className="text-lg leading-[1.6] text-[#262625]">
              Fieldwork is an architecture firm defined by a minimal yet human-centered philosophy.
              Guided by decades of collective expertise, our team approaches every project with rigor,
              precision, and creativity. We believe architecture should not chase trends but instead
              embody clarity, restraint, and long-lasting value.
            </p>
            <p className="text-lg leading-[1.6] text-[#262625]">
              Our practice spans across scales and disciplines, from residential and commercial
              architecture to cultural institutions and urban design. By blending technical expertise
              with cultural awareness, we create environments that respect context, enhance
              functionality, and inspire those who experience them.
            </p>
          </div>
          <div className="mt-8">
            <SecondaryLink>About</SecondaryLink>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="text-5xl font-medium tracking-tight text-[#262625] mb-4">{stat.value}</p>
            <p className="text-lg font-medium text-[#262625] mb-2">{stat.label}</p>
            <p className="text-lg leading-[1.6] text-[#262625/60]">{stat.desc}</p>
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
        <div className="border-t border-[#262625/12] pt-24">
          <div className="grid grid-cols-5 gap-x-8">
            {/* Label in col 1 */}
            <div className="col-span-1">
              <SectionLabel>(FW 03) &mdash; SERVICES</SectionLabel>
            </div>
            {/* Empty col 2 acts as gutter */}
            <div className="col-span-1" />
            {/* Content spans cols 3-5 */}
            <div className="col-span-3">
              <h2 className="text-[40px] font-medium leading-[1.2] text-[#262625] mb-4">
                Discover the full range of services that shape lasting architecture.
              </h2>
              <p className="text-lg leading-[1.6] text-[#262625/60] mb-16 max-w-2xl">
                From early strategy to detailed delivery, we combine expertise and vision to ensure that
                every project feels cohesive, intentional, and built to last.
              </p>
              <div className="grid grid-cols-2 gap-x-16 gap-y-20 mb-16">
                {SERVICES.map((service) => (
                  <div key={service.num} className="border-t border-[#262625/12] pt-8">
                    <span className="text-lg font-medium text-[#262625] block mb-3">
                      ({service.num})
                    </span>
                    <h3 className="text-lg font-medium text-[#262625] mb-4">{service.title}</h3>
                    <p className="text-lg leading-[1.6] text-[#262625/60]">{service.desc}</p>
                  </div>
                ))}
              </div>
              <SecondaryLink>View services</SecondaryLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkSection() {
  return (
    <section className="py-32">
      <div className="max-w-[1280px] mx-auto px-12">
        <div className="grid grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-[40px] font-medium leading-[1.2] text-[#262625] mb-6">
              We showcase architecture built on precision and purpose.
            </h2>
            <p className="text-lg leading-[1.6] text-[#262625/60]">
              Our portfolio spans residential, commercial, and cultural projects designed with clarity
              and restraint. Each piece of work reflects our philosophy of creating spaces that balance
              modern aesthetics with long-lasting functionality.
            </p>
          </div>
          <div className="flex items-end justify-end">
            <SectionLabel align="right">(FW 04) &mdash; WORK</SectionLabel>
          </div>
        </div>
        <div className="border-t border-[#262625/12]">
          {PROJECTS.map((project) => (
            <a
              key={project.name}
              href="#"
              className="grid grid-cols-[200px_48px_1fr_200px_24px] items-center gap-4 py-5 border-b border-[#262625/12] group hover:bg-[#F5F4F1] transition-colors -mx-4 px-4 rounded"
            >
              <span className="text-lg font-medium text-[#262625/60]">{project.year}</span>
              <div className="w-12 h-9 rounded-lg overflow-hidden">
                <img
                  src={ASSETS.workThumbs[project.thumb]}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-medium text-[#262625]">{project.name}</span>
              <span className="text-lg font-medium text-[#262625/60]">{project.type}</span>
              <ArrowIcon className="w-4 h-4 text-[#262625/60] opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientsSection() {
  return (
    <section className="py-32">
      <div className="max-w-[1280px] mx-auto px-12">
        <div className="grid grid-cols-5 gap-x-8">
          {/* Label in col 1 */}
          <div className="col-span-1">
            <SectionLabel>(FW 05) &mdash; CLIENTS</SectionLabel>
          </div>
          {/* Empty col 2 acts as gutter */}
          <div className="col-span-1" />
          {/* Content spans cols 3-5 */}
          <div className="col-span-3">
            <h2 className="text-[40px] font-medium leading-[1.2] text-[#262625] mb-4">
              We build trust through relationships as lasting as our spaces.
            </h2>
            <p className="text-lg leading-[1.6] text-[#262625/60] mb-16">
              Our clients range from developers to cultural institutions and private homeowners. Each
              partnership is grounded in clear communication, professional rigor, and a shared belief in
              design that stands the test of time.
            </p>
            <div className="border-t border-[#262625/12] pt-12">
              <div className="grid grid-cols-2 gap-16">
                {TESTIMONIALS.map((t) => (
                  <div key={t.name}>
                    <p className="text-2xl font-medium leading-[1.4] text-[#262625] mb-8">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="text-lg text-[#262625]">{t.name}</p>
                    <p className="text-lg text-[#262625/60]">{t.role}</p>
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

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-32 bg-[#FAF9F6]">
      <div className="max-w-[1280px] mx-auto px-12">
        <div className="flex items-start justify-between mb-16">
          <h2 className="text-[40px] font-medium leading-[1.2] text-[#262625]">
            We answer the questions that matter most.
          </h2>
          <SectionLabel align="right">(FW 06) &mdash; FAQ</SectionLabel>
        </div>
        <div className="grid grid-cols-2 gap-16">
          <p className="text-lg leading-[1.6] text-[#262625/60]">
            Choosing the right architecture firm is a big decision. These are the questions our clients
            ask most often before starting a project with us.
          </p>
          <div className="border-t border-[#262625/12]">
            {FAQ_ITEMS.map((question, i) => (
              <div key={i} className="border-b border-[#262625/12]">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="text-lg font-medium text-[#262625] group-hover:opacity-70 transition-opacity">
                    {question}
                  </span>
                  <ChevronIcon
                    open={openIndex === i}
                    className="w-6 h-6 text-[#262625] flex-shrink-0 ml-8"
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i ? "max-h-40 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-lg leading-[1.6] text-[#262625/60]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#262625] text-white py-24">
      <div className="max-w-[1280px] mx-auto px-12">
        <h2 className="text-[40px] font-medium leading-[1.2] mb-4 max-w-2xl">
          Let&apos;s start designing a space that matches your vision.
        </h2>
        <div className="mb-16">
          <SecondaryLink color="white">Start your project</SecondaryLink>
        </div>
        <div className="border-t border-[#ffffff/15] mb-16" />
        <div className="grid grid-cols-3 gap-16">
          {/* Contact info */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-lg font-medium text-[#262625/60] mb-2">Email</p>
              <a
                href="mailto:hello@fieldwork.studio"
                className="text-lg font-medium text-white hover:opacity-70 transition-opacity"
              >
                hello@fieldwork.studio
              </a>
            </div>
            <div>
              <p className="text-lg font-medium text-[#262625/60] mb-2">Phone</p>
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
            <p className="text-lg font-medium text-[#262625/60] mb-4">Navigation</p>
            <div className="flex flex-col gap-2">
              {FOOTER_NAV.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-lg font-medium text-white hover:opacity-70 transition-opacity"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          {/* Social */}
          <div>
            <p className="text-lg font-medium text-[#262625/60] mb-4">Social</p>
            <div className="flex flex-col gap-2">
              {FOOTER_SOCIAL.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-lg font-medium text-white hover:opacity-70 transition-opacity"
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
            FIELDWORK
          </p>
        </div>
      </div>
    </footer>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function FieldworkTemplate() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen" style={{ fontFamily: "'Satoshi', sans-serif" }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WorkSection />
        <ClientsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
