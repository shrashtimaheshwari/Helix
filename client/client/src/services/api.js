const API_URL = "http://localhost:5000/api/genes";

export async function getGeneData() {
  const res = await fetch(API_URL);
  return res.json();
}
