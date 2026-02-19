const mongoose = require("mongoose");

const AnalysisSchema = new mongoose.Schema({
  patient_id: String,
  drug: String,
  timestamp: Date,

  risk_assessment: {
    risk_label: String,
    confidence_score: Number,
    severity: String,
  },

  pharmacogenomic_profile: {
    primary_gene: String,
    diplotype: String,
    phenotype: String,
    detected_variants: [
      {
        rsid: String
      }
    ]
  },

  clinical_recommendation: {
    action: String,
    dosing_guidance: String,
    alternative_therapy: String,
    monitoring: String,
    evidence_level: String,
  },

  llm_generated_explanation: {
    summary: String,
    variant_citation: [String],
    biological_mechanism: String,
    clinical_rationale: String,
  },

  quality_metrics: {
    vcf_parsing_success: Boolean,
    gene_detected: Boolean,
    phenotype_determined: Boolean,
    malformed_lines_count: Number,
  },

  created_at: {
    type: Date,
    default: Date.now
  }

}, { versionKey: false });

module.exports = mongoose.model("AnalysisLog", AnalysisSchema);