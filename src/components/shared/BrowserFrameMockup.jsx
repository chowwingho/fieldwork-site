import { MONO } from "./constants";
import PlaceholderImage from "./PlaceholderImage";

export default function BrowserFrameMockup({ filename = "report.html", label = "Report Preview", children }) {
  return (
    <div style={{ border: "1px solid var(--mr-border-default)", borderRadius: "var(--mr-radius-lg)", overflow: "hidden" }}>
      {/* Chrome bar */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ background: "var(--mr-bg-card)", borderBottom: "1px solid var(--mr-border-default)" }}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--mr-border-default)" }}
            />
          ))}
        </div>
        <span className="text-xs" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
          {filename}
        </span>
      </div>
      {/* Content */}
      {children || <PlaceholderImage label={label} aspectRatio="16/9" className="rounded-none" />}
    </div>
  );
}
