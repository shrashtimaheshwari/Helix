import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function RiskAssessment({ analysis: propAnalysis }) {
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const analysis = propAnalysis || location.state;

  useEffect(() => {
    if (!analysis) {
      // If no analysis was provided, navigate back to home
      navigate("/", { replace: true });
    }
  }, [analysis, navigate]);

  /* ================= RISK LOGIC ================= */

  if (!analysis) return null;

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
    <main className="max-w-5xl mx-auto px-6 py-16 space-y-16">

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
      {/* 4️⃣ DOSAGE RECOMMENDATION */}
      {/* ================================================= */}

      <section className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4">
        <h2 className="text-xl font-semibold">
          Dosage Recommendation
        </h2>

        <p className="text-slate-700">
          {analysis.clinical_recommendation.dosing_guidance}
        </p>

        <p className="text-sm text-slate-500">
          Alternative Therapy:{" "}
          {analysis.clinical_recommendation.alternative_therapy}
        </p>
      </section>

      {/* ================================================= */}
      {/* 5️⃣ VARIANT CITATIONS & MECHANISM */}
      {/* ================================================= */}

      <section className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6">
        <h2 className="text-xl font-semibold">
          Genomic Interpretation
        </h2>

        <div>
          <p className="font-medium mb-1">
            Biological Mechanism
          </p>
          <p className="text-slate-700">
            {analysis.llm_generated_explanation.biological_mechanism}
          </p>
        </div>

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
                  <li key={i}>{v}</li>
                )
              )}
            </ul>
          )}
        </div>
      </section>

      {/* ================================================= */}
      {/* 6️⃣ FULL JSON (NEON TERMINAL STYLE) */}
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
            className="px-4 py-2 rounded-lg bg-green-500 text-black text-sm font-semibold"
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
              a.download = "helix_result.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-4 py-2 rounded-lg border border-green-400 text-green-400 text-sm"
          >
            Download JSON
          </button>
        </div>
      </section>

    </main>
  );
}
