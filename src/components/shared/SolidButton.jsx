import Link from "next/link";
import { MONO } from "./constants";

export default function SolidButton({ children, href = "#" }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center mr-btn-primary px-5 py-2.5 rounded-lg text-base font-medium w-fit"
      style={MONO}
    >
      {children}
    </Link>
  );
}
