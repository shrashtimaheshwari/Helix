import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import RiskAssessment from "./pages/RiskAssessment";

export default function App() {
  const location = useLocation();
  const state = location.state || {};
  const results = state.results || [];

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/risk"
        element={
          results.length > 0 ? (
            <RiskAssessment analyses={results} />
          ) : (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">
                  No Analysis Results Found
                </h1>
                <p className="text-slate-600 mb-6">
                  Please run an analysis first to view risk assessment results.
                </p>
                <a
                  href="/"
                  className="inline-block px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Back to Home
                </a>
              </div>
            </div>
          )
        }
      />
    </Routes>
  );
}
