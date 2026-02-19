module.exports = (phenotype) => {

  switch (phenotype) {

    case "PM":
      return {
        risk_label: "Toxic",
        action: "Avoid standard azathioprine dosing.",
        dosing_guidance: "High risk of severe myelosuppression.",
        alternative_therapy: "Consider non-thiopurine therapy.",
        monitoring: "Frequent complete blood count monitoring required.",
        evidence_level: "CPIC Level A"
      };

    case "IM":
      return {
        risk_label: "Adjust Dosage",
        action: "Reduce starting dose.",
        dosing_guidance: "Moderate risk of myelosuppression.",
        alternative_therapy: "Not routinely required.",
        monitoring: "Monitor CBC closely.",
        evidence_level: "CPIC Level A"
      };

    case "NM":
      return {
        risk_label: "Safe",
        action: "Use standard dosing.",
        dosing_guidance: "Standard azathioprine dosing appropriate.",
        alternative_therapy: "Not required.",
        monitoring: "Routine blood monitoring.",
        evidence_level: "CPIC Level A"
      };

    default:
      return {
        risk_label: "Unknown",
        action: "Insufficient genetic data.",
        dosing_guidance: "Use standard clinical protocol.",
        alternative_therapy: "Consider alternatives if needed.",
        monitoring: "Monitor blood counts.",
        evidence_level: "CPIC Level B"
      };
  }
};
