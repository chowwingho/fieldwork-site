import { MONO } from "./constants";

export default function SectionLabel({ children }) {
  const rendered =
    typeof children === "string" && children.startsWith("//")
      ? (
          <>
            <span style={{ color: "var(--mr-accent-default)" }}>//</span>
            {children.slice(2)}
          </>
        )
      : children;
  return (
    <span className="text-sm font-medium tracking-normal" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
      {rendered}
    </span>
  );
}
