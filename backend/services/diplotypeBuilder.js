exports.buildDiplotype = (geneVariants, targetGene) => {
  if (!geneVariants || !geneVariants[targetGene]) {
    return {
      diplotype: "*?/*?",
      detectedVariants: []
    };
  }

  const variants = geneVariants[targetGene];

  const starAlleles = variants
    .map(v => v.star)
    .filter(Boolean);

  const detectedVariants = variants.map(v => ({
    rsid: v.rsid
  }));

  let diplotype = "*?/*?";

  if (starAlleles.length >= 2) {
    diplotype = `${starAlleles[0]}/${starAlleles[1]}`;
  } else if (starAlleles.length === 1) {
    diplotype = `${starAlleles[0]}/*?`;
  }

  return {
    diplotype,
    detectedVariants
  };
};
