import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getUserProfile } from "@/api/getUserProfile";
import Avatar from "@/components/Avatar";
import { useTheme } from "@/hooks/themeHook";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../../hooks/authHook";

import type { dansal } from "@/types/dansalType";

export default function ProfileScreen() {
  const { user, accessToken, refreshToken, login } = useAuth();
  const { colors } = useTheme();

  const [dansals, setDansals] = useState<dansal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    try {
      if (!accessToken || !refreshToken) return;

      const res = await getUserProfile({
        accessToken,
        refreshToken,
      });

      setDansals(res.data.dansals ?? []);

      await login(
        res.data.userData,
        res.newTokens.refreshToken,
        res.newTokens.accessToken,
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  if (!user) {
    return (
      <View
        style={[styles.emptyContainer, { backgroundColor: colors.background }]}
      >
        <View
          style={[
            styles.emptyCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.emptyIconWrap,
              { backgroundColor: colors.primary + "20" },
            ]}
          >
            <Ionicons name="person-outline" size={28} color={colors.primary} />
          </View>

          <Text style={[styles.emptyText, { color: colors.subText }]}>
            Please login or register to show profile info
          </Text>

          <View style={styles.authButtons}>
            <Pressable
              style={({ pressed }) => [
                styles.authButton,
                { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 },
              ]}
              onPress={() => router.push("/Login")}
            >
              <Ionicons name="log-in-outline" size={16} color="#fff" />
              <Text style={[styles.authButtonText, { color: "#fff" }]}>
                Login
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.authButton,
                {
                  backgroundColor: colors.headerBackground,
                  borderColor: colors.border,
                  borderWidth: 1,
                  marginLeft: 12,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              onPress={() => router.push("/Register")}
            >
              <Ionicons name="person-add-outline" size={16} color="#fff" />
              <Text style={[styles.authButtonText, { color: "#fff" }]}>
                Register
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.profileCard,
          {
            backgroundColor: colors.headerBackground,
            borderColor: colors.border,
          },
        ]}
      >
        <Avatar name={user?.name ?? ""} size={72} />

        <View style={styles.userInfo}>
          <Text style={[styles.name, { color: colors.headerText }]}>
            {user?.name}
          </Text>

          <View style={styles.emailRow}>
            <Ionicons name="mail-outline" size={13} color={colors.subText} />
            <Text style={[styles.email, { color: colors.subText }]}>
              {user?.email}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionTitleRow}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          My Dansals
        </Text>
        {dansals.length > 0 && (
          <View
            style={[
              styles.countBadge,
              { backgroundColor: colors.primary + "20" },
            ]}
          >
            <Text style={[styles.countBadgeText, { color: colors.primary }]}>
              {dansals.length}
            </Text>
          </View>
        )}
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      ) : dansals.length > 0 ? (
        dansals.map((dansal) => (
          <View
            key={dansal.id}
            style={[
              styles.dansalCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.dansalHeader}>
              <View style={styles.dansalTypeRow}>
                <View
                  style={[
                    styles.dansalIconWrap,
                    { backgroundColor: colors.primary + "20" },
                  ]}
                >
                  <Ionicons
                    name="restaurant-outline"
                    size={14}
                    color={colors.primary}
                  />
                </View>
                <Text style={[styles.dansalType, { color: colors.primary }]}>
                  {dansal.type}
                </Text>
              </View>

              <View
                style={[
                  styles.queuePill,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons
                  name="people-outline"
                  size={12}
                  color={colors.subText}
                />
                <Text style={[styles.queueLength, { color: colors.subText }]}>
                  {dansal.queueLength}
                </Text>
              </View>
            </View>

            <Text
              style={[styles.description, { color: colors.text }]}
              numberOfLines={3}
            >
              {dansal.description}
            </Text>
          </View>
        ))
      ) : (
        <View
          style={[
            styles.emptyCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons
            name="leaf-outline"
            size={22}
            color={colors.subText}
            style={{ marginBottom: 6 }}
          />
          <Text
            style={{
              color: colors.subText,
            }}
          >
            No dansals added yet
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
  },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },

  userInfo: {
    flex: 1,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
  },

  emailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },

  email: {
    fontSize: 14,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 28,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  countBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
  },

  countBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },

  loader: {
    marginTop: 12,
  },

  dansalCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },

  dansalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  dansalTypeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  dansalIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  dansalType: {
    fontSize: 16,
    fontWeight: "700",
  },

  queuePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
  },

  queueLength: {
    fontSize: 12,
    fontWeight: "600",
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  emptyIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
  },

  authButtons: {
    flexDirection: "row",
    marginTop: 12,
  },

  authButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    minWidth: 100,
    justifyContent: "center",
  },

  authButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },

  emptyCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
  },
});
