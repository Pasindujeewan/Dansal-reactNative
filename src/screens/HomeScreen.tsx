/**
 * File: src/screens/HomeScreen.tsx
 * Purpose: Home screen component showing main menu and welcome information.
 * Exports: `HomeScreenComponent`.
 */
import { useAuth } from "@/hooks/authHook";
import { useTheme } from "@/hooks/themeHook";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export function HomeScreenComponent() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { t } = useTranslation();

  const menuItems = [
    {
      title: t("homeScreen.findNearby"),
      icon: "location",
      route: "/Login",
    },
    {
      title: t("homeScreen.addDansal"),
      icon: "add",
      route: "/Login",
    },
  ];

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View
          style={[
            styles.greetingPill,
            { backgroundColor: colors.primary + "18" },
          ]}
        >
          <Ionicons name="hand-right" size={14} color={colors.primary} />
          <Text style={[styles.greetingText, { color: colors.primary }]}>
            {user
              ? `${t("common.welcome")}, ${user.name}`
              : t("homeScreen.welcomeTitle")}
          </Text>
        </View>

        <Text style={[styles.appName, { color: colors.text }]}>
          {t("homeScreen.appName")}
        </Text>

        <Text style={[styles.description, { color: colors.subText }]}>
          {t("homeScreen.description")}
        </Text>
      </View>

      {/* Menu Cards */}
      <View style={styles.menuList}>
        {menuItems.map((item, index) => (
          <Pressable
            onPress={() => router.push(item.route as any)}
            key={index}
            style={({ pressed }) => [
              styles.menuCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <View style={styles.menuCardLeft}>
              <View
                style={[
                  styles.menuIconWrap,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Ionicons name={item.icon as any} size={22} color="white" />
              </View>

              <Text style={[styles.menuTitle, { color: colors.text }]}>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
  },
  greetingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 12,
  },
  greetingText: {
    fontSize: 12,
    fontWeight: "600",
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
  },
  description: {
    marginTop: 6,
    fontSize: 16,
  },
  menuList: {
    flexDirection: "column",
    gap: 16,
  },
  menuCard: {
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  menuCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  menuIconWrap: {
    padding: 12,
    borderRadius: 14,
  },
  menuTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
});
