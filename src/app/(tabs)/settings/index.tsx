/**
 * File: src/app/(tabs)/settings/index.tsx
 * Purpose: Settings screen for the app. Uses `useTheme` for colors and
 * exposes a theme toggle. Also shows current user and a logout action.
 */
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Switch, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useTheme } from "@/hooks/themeHook";
import { useAuth } from "@/hooks/authHook";

export default function Settings() {
  const { colors, theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [language, setLanguage] = useState<"en" | "si">("en");

  useEffect(() => {
    (async () => {
      try {
        const stored = await SecureStore.getItemAsync("language");
        if (stored === "si" || stored === "en") {
          setLanguage(stored as "en" | "si");
        }
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  async function changeLanguage(l: "en" | "si") {
    setLanguage(l);
    try {
      await SecureStore.setItemAsync("language", l);
    } catch (e) {
      // ignore
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>Dark Theme</Text>
        <Switch
          value={theme === "dark"}
          onValueChange={toggleTheme}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={theme === "dark" ? colors.buttonText : colors.buttonText}
        />
      </View>

      {user && (
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.subText }]}>
            Signed in as
          </Text>
          <Text style={[styles.user, { color: colors.text }]}>
            {user.name} • {user.email}
          </Text>

          <Pressable
            onPress={logout}
            style={[styles.button, { backgroundColor: colors.error }]}
          >
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>
              Logout
            </Text>
          </Pressable>
        </View>
      )}

      {/* Language selection */}
      <View style={[styles.section, { marginTop: 20 }]}>
        <Text style={[styles.label, { color: colors.text, marginBottom: 8 }]}>
          Language
        </Text>

        <Pressable
          onPress={() => changeLanguage("en")}
          style={[
            styles.option,
            {
              backgroundColor: language === "en" ? colors.card : "transparent",
              borderColor: language === "en" ? colors.primary : colors.border,
            },
          ]}
        >
          <Text style={{ color: colors.text }}>English</Text>
        </Pressable>

        <Pressable
          onPress={() => changeLanguage("si")}
          style={[
            styles.option,
            {
              backgroundColor: language === "si" ? colors.card : "transparent",
              borderColor: language === "si" ? colors.primary : colors.border,
            },
          ]}
        >
          <Text style={{ color: colors.text }}>සිංහල</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
  },
  section: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
  },
  user: {
    marginTop: 6,
    fontSize: 15,
    marginBottom: 12,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "600",
  },
  option: {},
});
