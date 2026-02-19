const NON_FUNCTIONAL_ALLELES = {
  CYP2D6: ["*4", "*5", "*3"],
  CYP2C19: ["*2", "*3"],
  CYP2C9: ["*2", "*3"],
  SLCO1B1: ["*5", "*15"],
  TPMT: ["*2", "*3A", "*3C"],
  DPYD: ["*2A"]
};

exports.determinePhenotype = (gene, diplotype) => {
  if (!gene || !diplotype || diplotype.includes("*?")) {
    return "Unknown";
  }

  const alleles = diplotype.split("/");

  const nonFunctional = NON_FUNCTIONAL_ALLELES[gene] || [];

  const lossCount = alleles.filter(a =>
    nonFunctional.includes(a)
  ).length;

  // Deterministic rule framework
  if (lossCount === 2) {
    return "PM"; // Poor Metabolizer
  }

  if (lossCount === 1) {
    return "IM"; // Intermediate
  }

  if (lossCount === 0) {
    return "NM"; // Normal
  }

  return "Unknown";
};
