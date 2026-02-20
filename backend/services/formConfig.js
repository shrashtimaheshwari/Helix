/**
 * Centralized form and UI configuration delivered to the frontend.
 * Keeps supported lists and example payloads in one place.
 */
const SUPPORTED_DRUGS = [
  "CODEINE",
  "WARFARIN",
  "CLOPIDOGREL",
  "SIMVASTATIN",
  "AZATHIOPRINE",
  "FLUOROURACIL",
];

const FORM_SCHEMA = {
  fields: [
    { name: "vcf_file", type: "file", accept: ".vcf", maxSizeMB: 5 },
    { name: "drugs", type: "string", description: "Comma-separated drug names" },
  ],
  validations: {
    drugsPattern: "^[a-zA-Z,\\s]*$",
  },
};

const EXAMPLE_ANALYSIS = {
  patient_id: "PATIENT_ABC123",
  drug: "CODEINE",
  risk_assessment: {
    risk_label: "Unknown",
    confidence_score: 0.5,
    severity: "none",
  },
  pharmacogenomic_profile: {
    primary_gene: "UNKNOWN",
    diplotype: "*?/*?",
    phenotype: "Unknown",
    detected_variants: [],
  },
  clinical_recommendation: {
    dosing_guidance: "No recommendation available in Phase 1",
    alternative_therapy: "N/A",
  },
  llm_generated_explanation: {
    biological_mechanism: "Not determined.",
    variant_citation: [],
  },
};

module.exports = {
  SUPPORTED_DRUGS,
  FORM_SCHEMA,
  EXAMPLE_ANALYSIS,
};
