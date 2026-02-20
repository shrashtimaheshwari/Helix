const RISK_COLORS = {
  Toxic: "text-red-600",
  Ineffective: "text-purple-600",
  "Adjust Dosage": "text-yellow-600",
  Safe: "text-green-600",
  Unknown: "text-slate-500"
};

export default function ResultsSection({ results, overallRisk }) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-8 space-y-8">
      <h2 className="text-2xl font-bold">
        Analysis Results
      </h2>

      {/* Overall Risk */}
      <div className="inline-block px-4 py-2 rounded-full bg-slate-900 text-white font-semibold">
        Overall Risk: {overallRisk}
      </div>

      {/* Per-drug results */}
      <div className="space-y-6">
        {results.map((item, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-xl p-6 space-y-4"
          >
            <div className="flex justify-between items-center flex-wrap gap-4">
              <h3 className="text-lg font-semibold">
                Drug: {item.drug}
              </h3>

              <span className={`font-medium ${RISK_COLORS[item.risk_assessment.risk_label]}`}>
                {item.risk_assessment.risk_label}
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-slate-500">Severity</p>
                <p className="capitalize font-medium">
                  {item.risk_assessment.severity}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Confidence</p>
                <p className="font-medium">
                  {(item.risk_assessment.confidence_score * 100).toFixed(0)}%
                </p>
              </div>

              <div>
                <p className="text-slate-500">Primary Gene</p>
                <p className="font-medium">
                  {item.pharmacogenomic_profile.primary_gene}
                </p>
              </div>
            </div>

            <details className="text-sm">
              <summary className="cursor-pointer font-medium text-teal-700">
                View explanation
              </summary>

              <div className="mt-3 space-y-2 text-slate-600">
                <p><strong>Summary:</strong> {item.llm_generated_explanation.summary}</p>
                <p><strong>Mechanism:</strong> {item.llm_generated_explanation.biological_mechanism}</p>
                <p><strong>Clinical rationale:</strong> {item.llm_generated_explanation.clinical_rationale}</p>
              </div>
            </details>
          </div>
        ))}
      </div>
    </section>
  );
}
