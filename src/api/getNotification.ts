import { askLocationpermission } from "@/permissions/location";
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";
import { registerForPushNotifications } from "@/permissions/notificationToken";

export async function checkNearbyDansals() {
  const storedAccessToken = await SecureStore.getItemAsync("accessToken");
  const expoPushToken = await registerForPushNotifications();

  try {
    console.log("1. Requesting permission...");
    const granted = await askLocationpermission();

    if (!granted) {
      console.log("Permission denied");
      return;
    }

    console.log("2. Getting location...");
    let location = await Location.getLastKnownPositionAsync();

    if (!location) {
      location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
    }
    console.log(location);

    console.log("3. Sending request...");
    const response = await fetch(
      "http://10.0.2.2:3000/api/user/notification/check-nearby",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedAccessToken}`,

          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          expoPushToken: expoPushToken,
        }),
      },
    );

    console.log("Response:", response.status);
  } catch (err) {
    console.error("FAILED HERE:", err);
  }
}
