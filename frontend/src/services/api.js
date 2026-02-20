const API_URL = "https://helix-3-i6lt.onrender.com/api/genes";

export async function getGeneData() {
  const res = await fetch(API_URL);
  return res.json();
}
