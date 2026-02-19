module.exports = (phenotype) => {

  switch (phenotype) {

    case "PM":
      return {
        risk_label: "Ineffective",
        action: "Avoid codeine use.",
        dosing_guidance: "Codeine is unlikely to provide adequate analgesia.",
        alternative_therapy: "Consider morphine or non-opioid analgesics.",
        monitoring: "Monitor pain control closely.",
        evidence_level: "CPIC Level A"
      };

    case "IM":
      return {
        risk_label: "Adjust Dosage",
        action: "Use with caution.",
        dosing_guidance: "May require dose adjustment.",
        alternative_therapy: "Consider alternative analgesics if response inadequate.",
        monitoring: "Monitor analgesic response.",
        evidence_level: "CPIC Level A"
      };

    case "NM":
      return {
        risk_label: "Safe",
        action: "Use standard dosing.",
        dosing_guidance: "Standard recommended dosing applies.",
        alternative_therapy: "Not required.",
        monitoring: "Routine monitoring.",
        evidence_level: "CPIC Level A"
      };

    case "Unknown":
    default:
      return {
        risk_label: "Unknown",
        action: "Insufficient genetic information.",
        dosing_guidance: "Proceed with clinical caution.",
        alternative_therapy: "Consider alternative if clinically indicated.",
        monitoring: "Monitor patient response.",
        evidence_level: "CPIC Level B"
      };
  }
};
    