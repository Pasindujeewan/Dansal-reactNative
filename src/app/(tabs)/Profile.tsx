import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { useAuth } from "../../hooks/authHook";
import { getUserProfile } from "@/api/getUserProfile";
import { useTheme } from "@/hooks/themeHook";
import Avatar from "@/components/Avatar";

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

          <Text style={[styles.email, { color: colors.subText }]}>
            {user?.email}
          </Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        My Dansals
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
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
              <Text style={[styles.dansalType, { color: colors.primary }]}>
                {dansal.type}
              </Text>

              <Text style={[styles.queueLength, { color: colors.subText }]}>
                Queue: {dansal.queueLength}
              </Text>
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
  },

  userInfo: {
    flex: 1,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
  },

  email: {
    fontSize: 14,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 12,
  },

  dansalCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },

  dansalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  dansalType: {
    fontSize: 16,
    fontWeight: "700",
  },

  queueLength: {
    fontSize: 13,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
  },

  emptyCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
  },
});
