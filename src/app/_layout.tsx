import ThemeProvider from "@/hooks/themeHook";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function TabLayout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ title: "Home", headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            options={{ title: "Login", headerShown: true }}
          />
          <Stack.Screen
            name="Register"
            options={{ title: "Register", headerShown: true }}
          />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
