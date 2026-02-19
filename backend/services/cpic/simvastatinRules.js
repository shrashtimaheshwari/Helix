module.exports = (phenotype) => {

  switch (phenotype) {

    case "PM":
      return {
        risk_label: "Toxic",
        action: "Avoid simvastatin use.",
        dosing_guidance: "High risk of statin-induced myopathy.",
        alternative_therapy: "Consider pravastatin or rosuvastatin.",
        monitoring: "Monitor CK levels and muscle symptoms closely.",
        evidence_level: "CPIC Level A"
      };

    case "IM":
      return {
        risk_label: "Adjust Dosage",
        action: "Reduce simvastatin dose.",
        dosing_guidance: "Increased myopathy risk at higher doses.",
        alternative_therapy: "Consider alternative statin if needed.",
        monitoring: "Monitor for muscle pain or weakness.",
        evidence_level: "CPIC Level A"
      };

    case "NM":
      return {
        risk_label: "Safe",
        action: "Use standard dosing.",
        dosing_guidance: "Standard simvastatin dosing appropriate.",
        alternative_therapy: "Not required.",
        monitoring: "Routine monitoring.",
        evidence_level: "CPIC Level A"
      };

    default:
      return {
        risk_label: "Unknown",
        action: "Insufficient genetic data.",
        dosing_guidance: "Use clinical judgment.",
        alternative_therapy: "Consider alternative statin if clinically indicated.",
        monitoring: "Monitor patient closely.",
        evidence_level: "CPIC Level B"
      };
  }
};
