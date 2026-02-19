module.exports = (phenotype) => {

  switch (phenotype) {

    case "PM":
      return {
        risk_label: "Ineffective",
        action: "Avoid clopidogrel use.",
        dosing_guidance: "Reduced antiplatelet effect expected.",
        alternative_therapy: "Consider prasugrel or ticagrelor.",
        monitoring: "Monitor cardiovascular status closely.",
        evidence_level: "CPIC Level A"
      };

    case "IM":
      return {
        risk_label: "Adjust Dosage",
        action: "Consider alternative therapy.",
        dosing_guidance: "Reduced response possible.",
        alternative_therapy: "Prasugrel or ticagrelor may be preferred.",
        monitoring: "Monitor platelet response.",
        evidence_level: "CPIC Level A"
      };

    case "NM":
      return {
        risk_label: "Safe",
        action: "Use standard dosing.",
        dosing_guidance: "Standard dosing recommended.",
        alternative_therapy: "Not required.",
        monitoring: "Routine monitoring.",
        evidence_level: "CPIC Level A"
      };

    default:
      return {
        risk_label: "Unknown",
        action: "Insufficient genetic data.",
        dosing_guidance: "Use clinical judgment.",
        alternative_therapy: "Consider alternatives if needed.",
        monitoring: "Monitor patient closely.",
        evidence_level: "CPIC Level B"
      };
  }
};
