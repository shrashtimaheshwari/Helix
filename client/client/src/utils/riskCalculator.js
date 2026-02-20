export function calculateOverallRisk(results) {
  let score = 0;

  for (const item of results) {
    const { risk_label, severity } = item.risk_assessment;

    if (severity === "critical") {
      return "HIGH";
    }

    if (risk_label === "Toxic" || risk_label === "Ineffective") {
      score += 2;
    } else if (risk_label === "Adjust Dosage") {
      score += 1;
    }
  }

  if (score === 0) return "LOW";
  if (score <= 2) return "MODERATE";
  return "HIGH";
}
