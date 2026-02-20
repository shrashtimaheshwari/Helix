import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT: Logo + Brand */}
        <div className="flex items-center gap-5 justify-center">
          <img
            src="/logo.png"
            alt="Helix Logo"
            className="h-20 w-20 object-contain"
          />

          <span className="text-5xl font-bold tracking-wide">
            Helix
          </span>
          <span className="text-4xs tracking-wide text-slate-500">
           ~ A Gene-Guided Prescribing Platform
          </span>
        </div>

        {/* RIGHT: Quick links */}
        <div className="flex items-center gap-4">
          <Link
            to="/risk"
            className="px-4 py-2 rounded-md bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700"
          >
            View Example Risk
          </Link>
        </div>

      </div>
    </header>
  );
}
