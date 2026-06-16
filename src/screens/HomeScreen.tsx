/**
 * File: src/screens/HomeScreen.tsx
 * Purpose: Home screen component showing main menu and welcome information.
 * Exports: `HomeScreenComponent`.
 */
import { useTheme } from "@/hooks/themeHook";
import { Pressable, ScrollView, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useAuth } from "@/hooks/authHook";

export function HomeScreenComponent() {
  const { colors } = useTheme();
  const { user } = useAuth();

  const menuItems = [
    {
      title: "දන්සල් සොයන්න",
      icon: "location",
    },
    {
      title: "දන්සල් ඇතුලත් කරන්න ",
      icon: "add",
    },
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      contentContainerStyle={{
        padding: 20,
      }}
    >
      {/* Header */}
      <View
        style={{
          marginBottom: 30,
        }}
      >
        <Text>
          {user
            ? `Welcome, ${user.name} ${user.email}`
            : "Welcome to Dansal App!"}
        </Text>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: colors.text,
          }}
        >
          Dansal App
        </Text>

        <Text
          style={{
            marginTop: 6,
            fontSize: 16,
            color: colors.subText,
          }}
        >
          Find nearby dansals and eventsA
        </Text>
      </View>

      {/* Menu Cards */}
      <View
        style={{
          flexDirection: "column",
          gap: 16,
        }}
      >
        {menuItems.map((item, index) => (
          <Pressable
            onPress={() => {
              router.push("/Login");
            }}
            key={index}
            style={{
              backgroundColor: colors.card,
              borderRadius: 18,
              padding: 18,

              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",

              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
              }}
            >
              <View
                style={{
                  backgroundColor: colors.primary,
                  padding: 12,
                  borderRadius: 14,
                }}
              >
                <Ionicons name={item.icon as any} size={22} color="white" />
              </View>

              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                  color: colors.text,
                }}
              >
                {item.title}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color={colors.subText} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
