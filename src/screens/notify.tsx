import { useEffect } from "react";
import { View, Button, Platform } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Notify() {
  useEffect(() => {
    async function setup() {
      // Request notification permission
      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== "granted") {
        alert("Notification permission denied");
        return;
      }

      // Create Android notification channel
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "Default",
          importance: Notifications.AndroidImportance.MAX,
        });
      }
    }

    setup();
  }, []);

  async function sendNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello 👋",
        body: "Local notification is working!",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
      },
    });
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Send Local Notification" onPress={sendNotification} />
    </View>
  );
}
