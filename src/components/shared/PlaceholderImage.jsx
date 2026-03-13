import { MONO } from "./constants";

export default function PlaceholderImage({ label, aspectRatio = "16/9", className = "" }) {
  return (
    <div
      className={`w-full flex items-center justify-center ${className}`}
      style={{
        aspectRatio,
        background: "var(--mr-bg-card)",
        border: "1px solid var(--mr-border-default)",
        borderRadius: "var(--mr-radius-lg)",
      }}
    >
      <div className="text-center px-4">
        <span className="text-sm font-medium block mb-1" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
          [ {label} ]
        </span>
        <span className="text-xs" style={{ ...MONO, color: "var(--mr-text-muted)", opacity: 0.5 }}>
          screenshot placeholder
        </span>
      </div>
    </div>
  );
}
