const { validateLLMOutput } = require("./llmValidator");
const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const FALLBACK_EXPLANATION = {
  summary: "Pharmacogenomic explanation unavailable.",
  variant_citation: [],
  biological_mechanism: "Not determined.",
  clinical_rationale: "Clinical logic derived from CPIC guidelines."
};

exports.generateExplanation = async ({
  drug,
  gene,
  diplotype,
  phenotype,
  riskLabel,
  evidenceLevel,
  detectedVariants
}) => {

  try {

    // 🛑 Skip LLM if no gene or no detected variants
    if (!gene || !Array.isArray(detectedVariants) || detectedVariants.length === 0) {
      return FALLBACK_EXPLANATION;
    }

    const variantList = detectedVariants.map(v => v.rsid);

    const prompt = `
You are a pharmacogenomics explanation engine.

Use ONLY the structured data provided.
Do NOT invent genes, variants, dosing, or additional risks.
Do NOT modify clinical recommendation.
If data missing, say "Not determined."
Output STRICT JSON only.
No markdown.
No extra commentary.

STRUCTURED INPUT:
Drug: ${drug}
Gene: ${gene}
Diplotype: ${diplotype}
Phenotype: ${phenotype}
Risk Label: ${riskLabel}
Evidence Level: ${evidenceLevel}
Detected Variants: ${variantList.join(", ")}

Required JSON format:
{
  "summary": "...",
  "variant_citation": [...],
  "biological_mechanism": "...",
  "clinical_rationale": "..."
}
`;

    console.log("Calling Groq with:", {
      drug,
      gene,
      diplotype,
      phenotype,
      riskLabel
    });

    // ⏱ Timeout protection (7 seconds)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("LLM Timeout")), 7000)
    );

    const response = await Promise.race([
      client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: "You are a clinical pharmacogenomics explanation engine."
          },
          {
            role: "user",
            content: prompt
          }
        ],
      }),
      timeoutPromise
    ]);

    // 🛑 Safe response structure guard
    if (!response || !response.choices || !response.choices[0]) {
      console.error("Invalid Groq response structure");
      return FALLBACK_EXPLANATION;
    }

    const raw = response.choices[0].message.content || "";

    const validated = validateLLMOutput(
      raw,
      variantList
    );

    if (!validated) {
      console.error("LLM OUTPUT REJECTED. Using fallback.");
      return FALLBACK_EXPLANATION;
    }

    return validated;

  } catch (error) {
    console.error("GROQ LLM ERROR:", error.message);
    return FALLBACK_EXPLANATION;
  }
};