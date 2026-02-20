const BASE_URL = "http://localhost:5000";

export async function analyzeGenome(vcfFile, drugs) {
  const formData = new FormData();

  formData.append("vcf_file", vcfFile);
  formData.append("drugs", drugs); // comma-separated string

  const response = await fetch(`${BASE_URL}/api/analyze`, {
    method: "POST",
    body: formData
  });

  // ❗ Always check HTTP status
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Analysis failed");
  }

  // Backend returns ARRAY directly
  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid response format from server");
  }

  return data;
}
