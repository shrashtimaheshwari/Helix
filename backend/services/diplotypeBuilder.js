exports.buildDiplotype = (geneVariants, targetGene) => {

  // Safety guard
  if (!targetGene || !geneVariants || !geneVariants[targetGene]) {
    return {
      diplotype: "*?/*?",
      detectedVariants: []
    };
  }

  const variants = geneVariants[targetGene];

  // Extract valid star alleles only
  const starAlleles = variants
    .map(v => v.star)
    .filter(star => typeof star === "string");

  // Ensure deterministic ordering
  const sortedStars = [...starAlleles].sort();

  // Extract rsids safely
  const detectedVariants = variants
    .filter(v => typeof v.rsid === "string")
    .map(v => ({
      rsid: v.rsid
    }));

  let diplotype = "*?/*?";

  if (sortedStars.length >= 2) {
    diplotype = `${sortedStars[0]}/${sortedStars[1]}`;
  } else if (sortedStars.length === 1) {
    diplotype = `${sortedStars[0]}/*?`;
  }

  return {
    diplotype,
    detectedVariants
  };
};