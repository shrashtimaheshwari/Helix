import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import FeatureCard from "../components/FeatureCard";
import AnalysisForm from "../components/AnalysisForm";
import ResultsSection from "../components/ResultsSection";
import LoadingOverlay from "../components/LoadingOverlay";
import Footer from "../components/Footer";
import { calculateOverallRisk } from "../utils/riskCalculator";

export default function Home() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [overallRisk, setOverallRisk] = useState(null);
  const [loading, setLoading] = useState(false);

  const resultsRef = useRef(null);

  const handleResults = (data) => {
    setResults(data);
    setOverallRisk(calculateOverallRisk(data));

    // Smooth scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      {loading && <LoadingOverlay />}

      <TopBar />

      <main className="max-w-7xl mx-auto px-6 py-14 space-y-20">

        {/* HERO */}
        <section className="text-center">
          <span className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-teal-100 text-teal-700">
            AI-Powered Drug Risk Assessment Platform
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Clinical Intelligence,
            <span className="text-teal-600"> Safer Prescription</span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-slate-600">
            Upload genomic data, enter medications, and receive instant
            pharmacogenomic risk assessments with explainable AI insights.
          </p>

          
        </section>

        {/* FEATURES */}
        <section className="grid md:grid-cols-3 gap-6">
          <FeatureCard title="Genomic Profiling" desc="VCF-based variant detection across key pharmacogenes" />
          <FeatureCard title="Risk Stratification" desc="Color-coded safety labels with confidence scoring" />
          <FeatureCard title="Explainable AI" desc="Human-readable reasoning behind every assessment" />
        </section>

        {/* ANALYSIS TOOL */}
        <AnalysisForm
          onResults={handleResults}
          onLoadingChange={setLoading}
          results={results}
        />

        {/* RESULTS (PAGE-LIKE SECTION) */}
        {results.length > 0 && (
          <div ref={resultsRef}>
            <ResultsSection
              results={results}
              overallRisk={overallRisk}
            />
          </div>
        )}

      </main>

      <Footer />
    </>
  );
}
