const SEVERITY_MAP = {
  "Safe": "none",
  "Unknown": "none",
  "Adjust Dosage": "moderate",
  "Ineffective": "high",
  "Toxic": "critical"
};

exports.mapSeverity = (riskLabel) => {
  return SEVERITY_MAP[riskLabel] || "none";
};
