import { apiFetch } from "./apiFetch";

export async function getSignature() {
  try {
    const res = await apiFetch("http://10.0.2.2:3000/api/cloudinary/signature");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching signature:", error);
    throw error;
  }
}
