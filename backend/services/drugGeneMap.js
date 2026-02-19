const DRUG_GENE_MAP = {
  CODEINE: "CYP2D6",
  CLOPIDOGREL: "CYP2C19",
  WARFARIN: "CYP2C9",
  SIMVASTATIN: "SLCO1B1",
  AZATHIOPRINE: "TPMT",
  FLUOROURACIL: "DPYD"
};

exports.getPrimaryGene = (drug) => {
  return DRUG_GENE_MAP[drug] || null;
};
