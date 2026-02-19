const fs = require("fs");

exports.parseVCF = (filePath) => {
  try {
    if (!filePath) {
      throw new Error("File path is undefined");
    }

    if (!fs.existsSync(filePath)) {
      throw new Error("File does not exist");
    }

    const content = fs.readFileSync(filePath, { encoding: "utf-8" });

    const lines = content.split(/\r?\n/);

    const geneVariants = {};
    let malformedLines = 0;

    for (let rawLine of lines) {

      const line = rawLine.trim();

      // Skip empty or header lines
      if (!line || line.startsWith("#")) continue;

      // Split defensively (handle multiple tabs)
      const columns = line.split(/\t+/);

      if (columns.length < 8) {
        malformedLines++;
        continue;
      }

      const id = columns[2]?.trim();
      const infoField = columns[7]?.trim();

      if (!infoField) {
        malformedLines++;
        continue;
      }

      const infoParts = infoField.split(";");
      const infoMap = {};

      for (let part of infoParts) {
        const [key, value] = part.split("=");

        if (key && value) {
          infoMap[key.trim().toUpperCase()] = value.trim();
        }
      }

      const gene = infoMap["GENE"] ? infoMap["GENE"].toUpperCase() : null;
      const star = infoMap["STAR"] || null;
      const rs = infoMap["RS"] || id || null;

      if (!gene) {
        malformedLines++;
        continue;
      }

      if (!geneVariants[gene]) {
        geneVariants[gene] = [];
      }

      geneVariants[gene].push({
        rsid: rs,
        star: star
      });
    }

    return {
      success: true,
      geneVariants,
      malformedLines
    };

  } catch (error) {
    console.error("VCF PARSER ERROR:", error.message);
    return {
      success: false,
      geneVariants: {},
      malformedLines: 0
    };
  }
};
