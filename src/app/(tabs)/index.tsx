import { HomeScreenComponent } from "@/screens/HomeScreen";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export default function HomeScreen() {
  useEffect(() => {
    // Runs when a notification is received while the app is open
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received!");
        console.log(notification);
      },
    );

    // Runs when the user taps a notification
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification tapped!");
        console.log(response);
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);
  return <HomeScreenComponent />;
}
