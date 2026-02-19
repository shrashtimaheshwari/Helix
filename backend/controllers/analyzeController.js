const { parseVCF } = require("../services/vcfParser");
const { getPrimaryGene } = require("../services/drugGeneMap");
const { buildDiplotype } = require("../services/diplotypeBuilder");
const { determinePhenotype } = require("../services/phenotypeEngine");
const { applyCpicRules } = require("../services/cpic/ruleEngine");
const { mapSeverity } = require("../services/severityEngine");

const SUPPORTED_DRUGS = [
    "CODEINE",
    "WARFARIN",
    "CLOPIDOGREL",
    "SIMVASTATIN",
    "AZATHIOPRINE",
    "FLUOROURACIL"
];

exports.analyze = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "VCF file is required" });
        }

        if (!req.body.drugs) {
            return res.status(400).json({ error: "Drugs field is required" });
        }

        const drugs = req.body.drugs
            .split(",")
            .map(d => d.trim().toUpperCase())
            .filter(Boolean);

        if (drugs.length === 0) {
            return res.status(400).json({
                error: "At least one valid drug must be provided"
            });
        }

        for (let drug of drugs) {
            if (!SUPPORTED_DRUGS.includes(drug)) {
                return res.status(400).json({
                    error: `Invalid drug name: ${drug}`
                });
            }
        }

        const parseResult = parseVCF(req.file.path);

        const {
            success: parsingSuccess,
            geneVariants,
            malformedLines
        } = parseResult;

        console.log("GENE VARIANTS:", geneVariants);

        const timestamp = new Date().toISOString();
        const patientId = "PATIENT_ABC123";

        const results = drugs.map(drug => {

            const primaryGene = getPrimaryGene(drug);

            const { diplotype, detectedVariants } = buildDiplotype(geneVariants, primaryGene);
            const phenotype = determinePhenotype(primaryGene, diplotype);
            const cpic = applyCpicRules(drug, phenotype);
            const severity = mapSeverity(cpic.risk_label);

            return {
                patient_id: patientId,
                drug: drug,
                timestamp: timestamp,
                risk_assessment: {
                    risk_label: cpic.risk_label,
                    confidence_score: 0.9,
                    severity: severity
                },

                pharmacogenomic_profile: {
                    primary_gene: primaryGene || "UNKNOWN",
                    diplotype: diplotype,
                    phenotype: phenotype,
                    detected_variants: detectedVariants
                },
                clinical_recommendation: {
                    action: cpic.action,
                    dosing_guidance: cpic.dosing_guidance,
                    alternative_therapy: cpic.alternative_therapy,
                    monitoring: cpic.monitoring,
                    evidence_level: cpic.evidence_level
                },

                llm_generated_explanation: {
                    summary: "Explanation not available in Phase 3.",
                    variant_citation: [],
                    biological_mechanism: "Not determined.",
                    clinical_rationale: "Clinical logic not implemented yet."
                },
                quality_metrics: {
                    vcf_parsing_success: parsingSuccess,
                    gene_detected: !!primaryGene && !!geneVariants[primaryGene],
                    phenotype_determined: phenotype !== "Unknown",
                    malformed_lines_count: malformedLines
                }
            };
        });


        return res.status(200).json(results);

    } catch (error) {
        console.error("SERVER ERROR:", error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};
