import { useTheme } from "@/hooks/themeHook";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insert = useSafeAreaInsets();
  const { theme, colors, toggleTheme } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.background,
            height: 72,
            paddingTop: 10,
            paddingBottom: insert.bottom,
            borderTopWidth: 0,
            elevation: 0,
          },
          headerStyle: {
            backgroundColor: colors.headerBackground,
            height: 70,
          },
          headerTintColor: colors.headerText,
          tabBarActiveTintColor: colors.tabActive,
          tabBarInactiveTintColor: colors.tabInactive,
          headerTitleStyle: {
            color: colors.headerText,
            fontSize: 20,
            fontWeight: "bold",
          },
          headerRight: () => (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 20,
                  marginRight: 15,
                }}
              >
                {theme === "light" ? (
                  <Ionicons
                    name="moon"
                    size={24}
                    color={colors.headerText}
                    onPress={toggleTheme}
                  />
                ) : (
                  <Ionicons
                    name="sunny"
                    size={24}
                    color={colors.headerText}
                    onPress={toggleTheme}
                  />
                )}

                <Ionicons
                  name="notifications"
                  size={24}
                  color={colors.headerText}
                />
              </View>
            </>
          ),

          headerShadowVisible: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="Map"
          options={{
            title: "Map",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
