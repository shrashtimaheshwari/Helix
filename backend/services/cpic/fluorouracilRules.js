module.exports = (phenotype) => {

  switch (phenotype) {

    case "PM":
      return {
        risk_label: "Toxic",
        action: "Avoid standard fluorouracil dosing.",
        dosing_guidance: "High risk of severe toxicity.",
        alternative_therapy: "Consider alternative chemotherapy regimen.",
        monitoring: "Close toxicity monitoring required.",
        evidence_level: "CPIC Level A"
      };

    case "IM":
      return {
        risk_label: "Adjust Dosage",
        action: "Reduce starting dose.",
        dosing_guidance: "Increased toxicity risk.",
        alternative_therapy: "Not routinely required.",
        monitoring: "Monitor for adverse reactions.",
        evidence_level: "CPIC Level A"
      };

    case "NM":
      return {
        risk_label: "Safe",
        action: "Use standard dosing.",
        dosing_guidance: "Standard fluorouracil dosing appropriate.",
        alternative_therapy: "Not required.",
        monitoring: "Routine monitoring.",
        evidence_level: "CPIC Level A"
      };

    default:
      return {
        risk_label: "Unknown",
        action: "Insufficient genetic data.",
        dosing_guidance: "Proceed with caution.",
        alternative_therapy: "Consider alternative therapy if clinically indicated.",
        monitoring: "Monitor patient closely.",
        evidence_level: "CPIC Level B"
      };
  }
};
