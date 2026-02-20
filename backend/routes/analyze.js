const express = require("express");
const multer = require("multer");
const analyzeController = require("../controllers/analyzeController");

const router = express.Router();

const upload = multer({
    dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post("/", upload.single("vcf_file"), analyzeController.analyze);

// Provide frontend with form/config JSON
const { SUPPORTED_DRUGS, FORM_SCHEMA, EXAMPLE_ANALYSIS } = require("../services/formConfig");

router.get("/config", (req, res) => {
  res.json({
    supported_drugs: SUPPORTED_DRUGS,
    form_schema: FORM_SCHEMA,
    example_analysis: EXAMPLE_ANALYSIS,
  });
});

module.exports = router;
