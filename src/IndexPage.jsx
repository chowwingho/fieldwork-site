import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen flex items-center justify-center" style={{ fontFamily: "'Satoshi', sans-serif" }}>
      <div className="text-center">
        <h1 className="text-4xl font-medium text-[#262625] mb-2">FIELDWORK</h1>
        <p className="text-lg text-[#888888] mb-12">Template variations</p>
        <div className="flex gap-6">
          <Link
            to="/v1"
            className="px-8 py-4 bg-[#262625] text-white text-lg font-medium rounded-lg hover:bg-[#333] transition-colors"
          >
            Version 1
          </Link>
          <Link
            to="/v2"
            className="px-8 py-4 bg-[#F0EEE6] text-[#262625] text-lg font-medium rounded-lg hover:bg-[#E5E2D8] transition-colors"
          >
            Version 2
          </Link>
        </div>
      </div>
    </div>
  );
}
