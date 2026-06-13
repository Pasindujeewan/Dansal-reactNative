import { Region } from "react-native-maps";

export async function getDansal(region: Region) {
  const north = region.latitude + region.latitudeDelta / 2;
  const south = region.latitude - region.latitudeDelta / 2;
  const east = region.longitude + region.longitudeDelta / 2;
  const west = region.longitude - region.longitudeDelta / 2;

  const searchParams = new URLSearchParams({
    north: north.toString(),
    south: south.toString(),
    east: east.toString(),
    west: west.toString(),
  });

  try {
    const res = await fetch(
      `http://10.0.2.2:3000/api/dansals/get?${searchParams.toString()}`,
    );
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch dansals");
    }
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log("error occur when get dansal", error.message);
      throw error;
    }
    throw new Error("Something went wrong");
  }
}
