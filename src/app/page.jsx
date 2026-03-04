import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen flex items-center justify-center" style={{ fontFamily: "'Satoshi', sans-serif" }}>
      <div className="text-center">
        <h1 className="text-4xl font-medium text-[#262625] mb-2">MANY ROADS AI</h1>
        <p className="text-lg text-[#888888] mb-12">Site variants</p>
        <div className="flex gap-6">
          <Link
            href="/v1"
            className="px-8 py-4 bg-[#262625] text-white text-lg font-medium rounded-lg hover:bg-[#333] transition-colors"
          >
            Version 1
          </Link>
          <Link
            href="/v2"
            className="px-8 py-4 bg-[#E8E6DD] text-[#262625] text-lg font-medium rounded-lg hover:bg-[#DEDAD0] transition-colors"
          >
            Version 2
          </Link>
          <Link
            href="/v3"
            className="px-8 py-4 bg-[#E8E6DD] text-[#262625] text-lg font-medium rounded-lg hover:bg-[#DEDAD0] transition-colors"
          >
            Version 3
          </Link>
        </div>
      </div>
    </div>
  );
}
