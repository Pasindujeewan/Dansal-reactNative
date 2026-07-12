import * as Location from "expo-location";

export async function askLocationpermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") return false;
  return true;
}
