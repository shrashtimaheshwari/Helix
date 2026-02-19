

// Strict schema enforcement for LLM output
const REQUIRED_KEYS = [
  "summary",
  "variant_citation",
  "biological_mechanism",
  "clinical_rationale"
];

// Remove markdown formatting if model returns ```json ... ```
function cleanOutput(text) {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

// Safe JSON parsing
function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
}

// Ensure required keys exist and no extra keys
function validateKeys(obj) {
  const keys = Object.keys(obj);

  // Check required keys exist
  for (let key of REQUIRED_KEYS) {
    if (!keys.includes(key)) {
      return false;
    }
  }

  // Ensure no extra keys
  for (let key of keys) {
    if (!REQUIRED_KEYS.includes(key)) {
      return false;
    }
  }

  return true;
}

// Ensure correct data types
function validateTypes(obj) {
  const MAX_LENGTH = 1500;

  return (
    typeof obj.summary === "string" &&
    obj.summary.length > 5 &&
    obj.summary.length <= MAX_LENGTH &&

    Array.isArray(obj.variant_citation) &&

    typeof obj.biological_mechanism === "string" &&
    obj.biological_mechanism.length > 5 &&
    obj.biological_mechanism.length <= MAX_LENGTH &&

    typeof obj.clinical_rationale === "string" &&
    obj.clinical_rationale.length > 5 &&
    obj.clinical_rationale.length <= MAX_LENGTH
  );
}


// Hallucination guard: only allow detected rsIDs
function validateCitations(obj, allowedRsids = []) {

  if (!Array.isArray(obj.variant_citation)) return false;

  const unique = new Set(obj.variant_citation);

  // No duplicates
  if (unique.size !== obj.variant_citation.length) {
    return false;
  }

  return obj.variant_citation.every(rs =>
    allowedRsids.includes(rs)
  );
}


// Main validator function
exports.validateLLMOutput = (rawText, allowedRsids) => {

  const cleaned = cleanOutput(rawText);
  const parsed = safeJsonParse(cleaned);

  if (!parsed) {
    console.error("LLM VALIDATION FAILED: Invalid JSON");
    return null;
  }

  // Ensure required keys exist
  for (let key of REQUIRED_KEYS) {
    if (!parsed.hasOwnProperty(key)) {
      console.error("LLM VALIDATION FAILED: Missing key", key);
      return null;
    }
  }

  // Fix types if possible
  if (!Array.isArray(parsed.variant_citation)) {
    parsed.variant_citation = [];
  }

  // 🔥 Remove duplicates
  parsed.variant_citation = [...new Set(parsed.variant_citation)];

  // 🔥 Remove hallucinated rsIDs
  parsed.variant_citation = parsed.variant_citation.filter(rs =>
    allowedRsids.includes(rs)
  );

  // Ensure strings exist
  parsed.summary = typeof parsed.summary === "string"
    ? parsed.summary
    : "Not determined.";

  parsed.biological_mechanism = typeof parsed.biological_mechanism === "string"
    ? parsed.biological_mechanism
    : "Not determined.";

  parsed.clinical_rationale = typeof parsed.clinical_rationale === "string"
    ? parsed.clinical_rationale
    : "Not determined.";

  return parsed;
};
