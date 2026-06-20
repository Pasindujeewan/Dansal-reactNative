/**
 * File: src/app/(tabs)/settings/index.tsx
 * Purpose: Settings screen for the app. Uses `useTheme` for colors and
 * exposes a theme toggle. Also shows current user and a logout action.
 */
import { useAuth } from "@/hooks/authHook";
import { useTheme } from "@/hooks/themeHook";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import i18n from "../../../ii8n";

export default function Settings() {
  const { colors, theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [language, setLanguage] = useState<"en" | "si">("en");

  const changeLanguage = (lang: "en" | "si") => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      <Text style={[styles.subtitle, { color: colors.subText }]}>
        Manage how Dansal looks and works for you
      </Text>

      {/* Appearance */}
      <Text style={[styles.sectionHeader, { color: colors.subText }]}>
        APPEARANCE
      </Text>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <View
              style={[
                styles.iconWrap,
                { backgroundColor: colors.primary + "20" },
              ]}
            >
              <Ionicons
                name={theme === "dark" ? "moon" : "sunny"}
                size={18}
                color={colors.primary}
              />
            </View>
            <Text style={[styles.label, { color: colors.text }]}>
              Dark Theme
            </Text>
          </View>
          <Switch
            value={theme === "dark"}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.buttonText}
          />
        </View>
      </View>

      {/* Language */}
      <Text style={[styles.sectionHeader, { color: colors.subText }]}>
        LANGUAGE
      </Text>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Pressable
          onPress={() => changeLanguage("en")}
          style={[
            styles.langRow,
            language !== "si" && { borderBottomWidth: 0 },
            { borderBottomColor: colors.border },
          ]}
        >
          <View style={styles.rowLeft}>
            <View
              style={[
                styles.iconWrap,
                { backgroundColor: colors.primary + "20" },
              ]}
            >
              <Ionicons name="language" size={18} color={colors.primary} />
            </View>
            <Text style={[styles.label, { color: colors.text }]}>English</Text>
          </View>
          {language === "en" && (
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={colors.primary}
            />
          )}
        </Pressable>

        <Pressable
          onPress={() => changeLanguage("si")}
          style={[styles.langRow, { borderBottomWidth: 0 }]}
        >
          <View style={styles.rowLeft}>
            <View
              style={[
                styles.iconWrap,
                { backgroundColor: colors.primary + "20" },
              ]}
            >
              <Ionicons name="language" size={18} color={colors.primary} />
            </View>
            <Text style={[styles.label, { color: colors.text }]}>සිංහල</Text>
          </View>
          {language === "si" && (
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={colors.primary}
            />
          )}
        </Pressable>
      </View>

      {/* Account */}
      {user && (
        <>
          <Text style={[styles.sectionHeader, { color: colors.subText }]}>
            ACCOUNT
          </Text>
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={styles.profileRow}>
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: colors.primary + "25" },
                ]}
              >
                <Text style={[styles.avatarText, { color: colors.primary }]}>
                  {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                </Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={[styles.user, { color: colors.text }]}>
                  {user.name}
                </Text>
                <Text style={[styles.userEmail, { color: colors.subText }]}>
                  {user.email}
                </Text>
              </View>
            </View>

            <Pressable
              onPress={logout}
              style={({ pressed }) => [
                styles.button,
                {
                  backgroundColor: colors.error,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Ionicons
                name="log-out-outline"
                size={18}
                color={colors.buttonText}
              />
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>
                Logout
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 4,
  },
  card: {
    borderRadius: 16,
    marginBottom: 24,
    paddingHorizontal: 14,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  langRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
  },
  profileInfo: {
    flex: 1,
  },
  user: {
    fontSize: 16,
    fontWeight: "600",
  },
  userEmail: {
    fontSize: 13,
    marginTop: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 14,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 15,
  },
});
