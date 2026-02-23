import CodeBlock from "./CodeBlock";
import { MONO } from "./constants";
import SectionHeader from "./SectionHeader";

const V2_MARKERS = [
  "// 01 \u2014 THE_PROBLEM",
  "// 02 \u2014 WHY_TEAMS_STALL",
  "// 03 \u2014 TWO_PATHWAYS",
  "// 04 \u2014 THE_TEAM",
  "// 05 \u2014 WHY_TRUST_US",
];

const MARKER_SPECS = [
  { property: "Font", value: "Geist Mono (--mr-font-mono)" },
  { property: "Size", value: "text-lg (18px)" },
  { property: "Weight", value: "font-medium (500)" },
  { property: "// color", value: "var(--mr-accent-default)" },
  { property: "Text color", value: "--mr-text-primary" },
  { property: "Case", value: "UPPER_SNAKE_CASE" },
  { property: "Whitespace", value: "whitespace-nowrap" },
];

const MARKER_RULES = [
  "Every major content section starts with a section marker.",
  "Markers are decorative navigation aids, not semantic headings.",
  "The // prefix references code comments \u2014 intentional developer familiarity.",
];

export default function MarkersSection() {
  return (
    <section id="section-markers" className="py-20">
      <div
        className="border-t pt-12"
        style={{ borderColor: "var(--mr-border-default)" }}
      >
        <SectionHeader
          marker="SECTION_MARKERS"
          title="Section Markers"
          description="One of the strongest brand elements. Every content section opens with a code-comment-style label in Geist Mono, connecting the visual language to developer culture."
        />

        {/* Format */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            FORMAT
          </span>
          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            <p
              className="text-[20px] font-medium mb-6"
              style={{ ...MONO, color: "var(--mr-text-primary)" }}
            >
              <span style={{ color: "var(--mr-accent-default)" }}>//</span> NN &mdash;
              SECTION_NAME
            </p>
            <div
              className="flex gap-6 text-[12px]"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              <span>// prefix (accent blue)</span>
              <span>2-digit number</span>
              <span>em dash separator</span>
              <span>UPPER_SNAKE_CASE label</span>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            SPECIFICATIONS
          </span>
          <div className="flex flex-col">
            {MARKER_SPECS.map((spec) => (
              <div
                key={spec.property}
                className="flex items-baseline justify-between py-2.5"
                style={{
                  borderTop: "1px solid var(--mr-border-default)",
                }}
              >
                <span
                  className="text-[13px] font-medium"
                  style={{ ...MONO, color: "var(--mr-text-primary)" }}
                >
                  {spec.property}
                </span>
                <span
                  className="text-[13px]"
                  style={{ ...MONO, color: "var(--mr-text-muted)" }}
                >
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* All Markers in V2 */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            ALL MARKERS IN V2
          </span>
          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            <div className="flex flex-col gap-4">
              {V2_MARKERS.map((marker) => (
                <span
                  key={marker}
                  className="text-lg font-medium block"
                  style={{ ...MONO, color: "var(--mr-text-primary)" }}
                >
                  <span style={{ color: "var(--mr-accent-default)" }}>//</span>
                  {marker.slice(2)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Usage Rules */}
        <div className="mb-8">
          <span
            className="text-[14px] font-medium block mb-4"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            RULES
          </span>
          <div className="flex flex-col gap-3 mb-6">
            {MARKER_RULES.map((rule, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="text-[14px] mt-0.5 flex-shrink-0"
                  style={{ ...MONO, color: "var(--mr-text-muted)" }}
                >
                  &mdash;
                </span>
                <span
                  className="text-[15px] leading-[1.5]"
                  style={{ color: "var(--mr-text-muted)" }}
                >
                  {rule}
                </span>
              </div>
            ))}
          </div>
          <CodeBlock>
{`/* SectionLabel component pattern */
<span className="text-lg font-medium" style={MONO}>
  <span style={{ color: "var(--mr-accent-default)" }}>//</span> 01 — THE_PROBLEM
</span>

/* V2 uses var(--accent) for the // color */
/* Design system uses var(--mr-accent-default) (brand green) */`}
          </CodeBlock>
        </div>
      </div>
    </section>
  );
}
