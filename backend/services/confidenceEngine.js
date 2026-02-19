exports.calculateConfidence = ({
  geneDetected = false,
  detectedVariantsCount = 0,
  phenotypeDetermined = false,
  evidenceLevel = "",
  malformedLines = 0
}) => {

  let score = 0;

  // Normalize evidence string safely
  const normalizedEvidence = String(evidenceLevel).toUpperCase();

  // 1️⃣ Gene Coverage (0–30)
  if (!geneDetected) {
    score += 0;
  } else if (detectedVariantsCount === 1) {
    score += 15;
  } else if (detectedVariantsCount >= 2) {
    score += 30;
  }

  // 2️⃣ Phenotype Determination (0–25)
  if (phenotypeDetermined) {
    score += 25;
  }

  // 3️⃣ CPIC Evidence Strength (0–25)
  if (normalizedEvidence.includes("LEVEL A")) {
    score += 25;
  } else if (normalizedEvidence.includes("LEVEL B")) {
    score += 15;
  } else {
    score += 5;
  }

  // 4️⃣ Data Quality (0–20)
  const safeMalformed = Number.isFinite(malformedLines) ? malformedLines : 0;
  const qualityScore = Math.max(0, 20 - safeMalformed);
  score += qualityScore;

  // Normalize
  let confidence = score / 100;

  // Clamp
  if (confidence > 0.95) confidence = 0.95;
  if (confidence < 0.1) confidence = 0.1;

  return Number(confidence.toFixed(2));
};