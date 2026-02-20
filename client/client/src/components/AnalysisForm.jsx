import { useRef, useState } from "react";
import { analyzeGenome } from "../services/analyzeApi";

export default function AnalysisForm({ onResults, onLoadingChange }) {
  const fileInputRef = useRef(null);

  const [vcfFile, setVcfFile] = useState(null);
  const [drugs, setDrugs] = useState("");
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  /* ---------------- FILE VALIDATION ---------------- */

  const validateAndSetFile = (file) => {
    if (!file.name.toLowerCase().endsWith(".vcf")) {
      setError("Only .vcf files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("VCF file size must be 5MB or less.");
      return;
    }

    setError(null);
    setVcfFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) validateAndSetFile(file);
  };

  const removeFile = () => {
    setVcfFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  /* ---------------- DRAG & DROP ---------------- */

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file) validateAndSetFile(file);
  };

  /* ---------------- DRUG INPUT ---------------- */

  const handleDrugChange = (e) => {
    const value = e.target.value;
    const validPattern = /^[a-zA-Z,\s]*$/;

    if (!validPattern.test(value)) {
      setError("Drug names must be comma-separated (letters only).");
      return;
    }

    setError(null);
    setDrugs(value);
  };

  /* ---------------- SUBMIT ---------------- */

  const handleAnalyze = async () => {
    if (!vcfFile) {
      setError("Please upload a VCF file.");
      return;
    }

    const drugList = drugs
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);

    if (drugList.length === 0) {
      setError("Please enter valid comma-separated drug names.");
      return;
    }

    setError(null);
    onLoadingChange(true);

    try {
      const results = await analyzeGenome(
        vcfFile,
        drugList.join(",")
      );

      // Backend ALWAYS returns an array
      onResults(results);
    } catch (err) {
      setError(err.message);
    } finally {
      onLoadingChange(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-md p-8">
      <h2 className="text-xl font-semibold mb-1">Run Analysis</h2>
      <p className="text-sm text-slate-500 mb-6">
        Upload genomic data and specify medications
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* VCF Upload */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Genomic Data
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept=".vcf"
            onChange={handleFileChange}
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`mt-2 rounded-xl p-6 text-center cursor-pointer transition
              border-2 border-dashed
              ${
                dragActive
                  ? "border-teal-500 bg-teal-50"
                  : "border-slate-300 hover:border-teal-400"
              }
            `}
          >
            <p className="font-medium text-slate-700">
              {vcfFile ? vcfFile.name : "Drag & drop VCF file here"}
            </p>
            <p className="text-xs text-slate-500">
              or click to browse (.vcf, max 5MB)
            </p>
          </div>

          {vcfFile && (
            <button
              type="button"
              onClick={removeFile}
              className="mt-3 text-sm text-red-600 hover:underline"
            >
              Remove file
            </button>
          )}
        </div>

        {/* Drug Input */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Medications
          </label>

          <textarea
            rows="4"
            value={drugs}
            onChange={handleDrugChange}
            placeholder="e.g. Warfarin, Clopidogrel, Codeine"
            className="mt-2 w-full rounded-xl border border-slate-300 p-3 text-sm
                       resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600 font-medium">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={handleAnalyze}
          className="px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold
                     hover:bg-teal-500 transition"
        >
          Analyze Interactions
        </button>

        <span className="text-sm text-slate-500">
          Results appear below after analysis
        </span>
      </div>
    </section>
  );
}
