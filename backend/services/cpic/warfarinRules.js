module.exports = (phenotype) => {

  switch (phenotype) {

    case "PM":
      return {
        risk_label: "Toxic",
        action: "Reduce starting dose significantly.",
        dosing_guidance: "Increased bleeding risk expected.",
        alternative_therapy: "Consider alternative anticoagulant if appropriate.",
        monitoring: "Close INR monitoring required.",
        evidence_level: "CPIC Level A"
      };

    case "IM":
      return {
        risk_label: "Adjust Dosage",
        action: "Reduce starting dose.",
        dosing_guidance: "Moderate bleeding risk.",
        alternative_therapy: "Not routinely required.",
        monitoring: "Frequent INR monitoring.",
        evidence_level: "CPIC Level A"
      };

    case "NM":
      return {
        risk_label: "Safe",
        action: "Use standard dosing.",
        dosing_guidance: "Standard dosing appropriate.",
        alternative_therapy: "Not required.",
        monitoring: "Routine INR monitoring.",
        evidence_level: "CPIC Level A"
      };

    default:
      return {
        risk_label: "Unknown",
        action: "Insufficient genetic data.",
        dosing_guidance: "Use standard clinical protocol.",
        alternative_therapy: "Consider alternatives if clinically indicated.",
        monitoring: "Monitor INR closely.",
        evidence_level: "CPIC Level B"
      };
  }
};
