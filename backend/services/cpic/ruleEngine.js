const codeineRules = require("./codeineRules");
const clopidogrelRules = require("./clopidogrelRules");
const warfarinRules = require("./warfarinRules");
const simvastatinRules = require("./simvastatinRules");
const azathioprineRules = require("./azathioprineRules");
const fluorouracilRules = require("./fluorouracilRules");

exports.applyCpicRules = (drug, phenotype) => {
  switch (drug) {
    case "CODEINE":
      return codeineRules(phenotype);
    case "CLOPIDOGREL":
      return clopidogrelRules(phenotype);
    case "WARFARIN":
      return warfarinRules(phenotype);
    case "SIMVASTATIN":
      return simvastatinRules(phenotype);
    case "AZATHIOPRINE":
      return azathioprineRules(phenotype);
    case "FLUOROURACIL":
      return fluorouracilRules(phenotype);
    default:
      return {
        risk_label: "Unknown",
        action: "No recommendation available",
        dosing_guidance: "N/A",
        alternative_therapy: "N/A",
        monitoring: "N/A",
        evidence_level: "CPIC Level B"
      };
  }
};
