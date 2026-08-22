import { askLocationpermission } from "@/permissions/location";
import { apiFetch } from "./apiFetch";

type SearchParams = {
  type: string;
  distance: number;
};
export async function searchDansal({ type, distance }: SearchParams) {
  try {
    const { latitude, longitude } = {
      latitude: 6.9394396243918735,
      longitude: 79.86041240394115,
    };
    const res = await apiFetch(
      `http://10.0.2.2:3000/api/dansals/search?type=${type}&distance=${distance}&latitude=${latitude}&longitude=${longitude}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Something went wrong");
  }
}
