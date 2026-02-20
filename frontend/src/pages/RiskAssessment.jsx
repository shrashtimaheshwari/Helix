import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";

export default function RiskAssessment({ analyses = [] }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!analyses || analyses.length === 0) {
    return (
      <>
        <TopBar />
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              No Analysis Data Available
            </h1>
            <p className="text-slate-600 mb-6">
              Please run an analysis first to view results.
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-block px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </>
    );
  }

  const analysis = analyses[selectedIndex];

  /* ================= RISK LOGIC ================= */

  const riskLabel = analysis.risk_assessment.risk_label;

  const riskLevel =
    riskLabel === "Safe" || riskLabel === "Unknown"
      ? "LOW"
      : riskLabel === "Adjust Dosage"
      ? "MODERATE"
      : "HIGH";

  const riskColor = {
    Safe: "bg-green-500",
    "Adjust Dosage": "bg-yellow-400",
    Toxic: "bg-red-500",
    Ineffective: "bg-red-500",
    Unknown: "bg-gray-400"
  }[riskLabel];

  /* ================= UI ================= */

  return (
    <>
      <TopBar />
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="text-teal-600 hover:text-teal-700 text-sm font-medium"
        >
          ← Back to Home
        </button>

      {/* DRUG TABS */}
      {analyses.length > 1 && (
        <section className="border-b border-slate-200">
          <div className="flex gap-2 overflow-x-auto">
            {analyses.map((a, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                  selectedIndex === idx
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                {a.drug}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ================================================= */}
      {/* 1️⃣ RISK SCALE */}
      {/* ================================================= */}

      <section className="text-center space-y-8">
        <h1 className="text-3xl font-bold">
          Drug Risk Assessment
        </h1>

        <div className="relative max-w-xl mx-auto">
          <div className="flex justify-between text-sm text-slate-500 mb-2">
            <span>Low</span>
            <span>Moderate</span>
            <span>High</span>
          </div>

          <div className="h-3 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500" />

          {/* Indicator */}
          <div
            className={`absolute top-6 transform -translate-x-1/2 text-sm font-semibold
              ${
                riskLevel === "LOW"
                  ? "left-[15%]"
                  : riskLevel === "MODERATE"
                  ? "left-1/2"
                  : "left-[85%]"
              }
            `}
          >
            ▲
            <div className="mt-1">{riskLevel}</div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 2️⃣ RISK LABEL BOX */}
      {/* ================================================= */}

      <section className="flex justify-center">
        <div
          className={`px-10 py-4 rounded-xl text-white font-semibold text-lg ${riskColor}`}
        >
          {riskLabel}
        </div>
      </section>

      {/* ================================================= */}
      {/* 3️⃣ FLASH CARD (KEY–VALUE) */}
      {/* ================================================= */}

      <section className="bg-white border border-slate-200 rounded-2xl p-8">
        <h2 className="text-xl font-semibold mb-6">
          Assessment Summary
        </h2>

        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-slate-500">Patient ID</p>
            <p className="font-medium">{analysis.patient_id}</p>
          </div>

          <div>
            <p className="text-slate-500">Drug</p>
            <p className="font-medium">{analysis.drug}</p>
          </div>

          <div>
            <p className="text-slate-500">Primary Gene</p>
            <p className="font-medium">
              {analysis.pharmacogenomic_profile.primary_gene}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Confidence Score</p>
            <p className="font-medium">
              {(analysis.risk_assessment.confidence_score * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 4️⃣ DOSAGE RECOMMENDATION & CLINICAL GUIDANCE */}
      {/* ================================================= */}

      <section className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6">
        <h2 className="text-xl font-semibold">
          Clinical Recommendation
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-slate-500 text-sm">Recommended Action</p>
            <p className="font-medium text-slate-900">{analysis.clinical_recommendation.action}</p>
          </div>

          <div>
            <p className="text-slate-500 text-sm">Dosage Guidance</p>
            <p className="text-slate-700">{analysis.clinical_recommendation.dosing_guidance}</p>
          </div>

          {analysis.clinical_recommendation.alternative_therapy !== "N/A" && (
            <div>
              <p className="text-slate-500 text-sm">Alternative Therapy</p>
              <p className="text-slate-700">{analysis.clinical_recommendation.alternative_therapy}</p>
            </div>
          )}

          {analysis.clinical_recommendation.monitoring && (
            <div>
              <p className="text-slate-500 text-sm">Monitoring</p>
              <p className="text-slate-700">{analysis.clinical_recommendation.monitoring}</p>
            </div>
          )}

          <div>
            <p className="text-slate-500 text-sm">Evidence Level</p>
            <p className="font-medium text-teal-600">{analysis.clinical_recommendation.evidence_level}</p>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 5️⃣ PHARMACOGENOMIC PROFILE */}
      {/* ================================================= */}

      <section className="bg-white border border-slate-200 rounded-2xl p-8">
        <h2 className="text-xl font-semibold mb-6">
          Pharmacogenomic Profile
        </h2>

        <div className="grid md:grid-cols-2 gap-6 text-sm mb-6">
          <div>
            <p className="text-slate-500">Gene</p>
            <p className="font-medium text-lg">{analysis.pharmacogenomic_profile.primary_gene}</p>
          </div>

          <div>
            <p className="text-slate-500">Diplotype</p>
            <p className="font-medium text-lg">{analysis.pharmacogenomic_profile.diplotype}</p>
          </div>

          <div>
            <p className="text-slate-500">Phenotype</p>
            <p className="font-medium text-lg">{analysis.pharmacogenomic_profile.phenotype}</p>
          </div>

          <div>
            <p className="text-slate-500">Variants Detected</p>
            <p className="font-medium">{analysis.pharmacogenomic_profile.detected_variants.length}</p>
          </div>
        </div>

        {analysis.pharmacogenomic_profile.detected_variants.length > 0 && (
          <div>
            <p className="font-medium mb-3">Detected Variants</p>
            <ul className="space-y-2">
              {analysis.pharmacogenomic_profile.detected_variants.map((variant, idx) => (
                <li key={idx} className="text-sm text-slate-700 bg-slate-50 p-2 rounded">
                  {typeof variant === "string" ? variant : JSON.stringify(variant)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* ================================================= */}
      {/* 6️⃣ LLM EXPLANATION */}
      {/* ================================================= */}

      <section className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6">
        <h2 className="text-xl font-semibold">
          AI-Generated Explanation
        </h2>

        <div>
          <p className="font-medium mb-2">Summary</p>
          <p className="text-slate-700">
            {analysis.llm_generated_explanation.summary || analysis.llm_generated_explanation.biological_mechanism}
          </p>
        </div>

        <div>
          <p className="font-medium mb-1">
            Biological Mechanism
          </p>
          <p className="text-slate-700">
            {analysis.llm_generated_explanation.biological_mechanism}
          </p>
        </div>

        {analysis.llm_generated_explanation.clinical_rationale && (
          <div>
            <p className="font-medium mb-1">Clinical Rationale</p>
            <p className="text-slate-700">
              {analysis.llm_generated_explanation.clinical_rationale}
            </p>
          </div>
        )}

        <div>
          <p className="font-medium mb-1">
            Variant Citations
          </p>

          {analysis.llm_generated_explanation.variant_citation.length === 0 ? (
            <p className="text-sm text-slate-500">
              No variant citations available.
            </p>
          ) : (
            <ul className="list-disc list-inside text-sm text-slate-700">
              {analysis.llm_generated_explanation.variant_citation.map(
                (v, i) => (
                  <li key={i}>{typeof v === "string" ? v : JSON.stringify(v)}</li>
                )
              )}
            </ul>
          )}
        </div>
      </section>

      {/* ================================================= */}
      {/* 7️⃣ FULL JSON (NEON TERMINAL STYLE) */}
      {/* ================================================= */}

      <section className="bg-black rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-green-400">
          Raw Analysis JSON
        </h2>

        <pre className="text-green-400 text-xs overflow-auto max-h-[400px]">
          {JSON.stringify(analysis, null, 2)}
        </pre>

        <div className="flex gap-4">
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                JSON.stringify(analysis, null, 2)
              );
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="px-4 py-2 rounded-lg bg-green-500 text-black text-sm font-semibold hover:bg-green-400 transition"
          >
            {copied ? "Copied!" : "Copy JSON"}
          </button>

          <button
            onClick={() => {
              const blob = new Blob(
                [JSON.stringify(analysis, null, 2)],
                { type: "application/json" }
              );
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `helix_result_${analysis.drug}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-4 py-2 rounded-lg border border-green-400 text-green-400 text-sm hover:bg-green-400/10 transition"
          >
            Download JSON
          </button>
        </div>
      </section>

      </main>
    </>
  );
}
