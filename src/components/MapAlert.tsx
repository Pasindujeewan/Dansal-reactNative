/**
 * File: src/components/MapAlert.tsx
 * Purpose: Small prompt shown on the map asking whether to add a Dansal at a location.
 * Exports: default `MapAlert` component.
 */
import { Pressable, Text, View } from "react-native";
import { LatLng } from "react-native-maps";

import { useTheme } from "@/hooks/themeHook";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { AddDansalForm } from "./AddDansalForm";

type Props = {
  visible: boolean;
  onAdd: () => void;
  onClose: () => void;
};

export default function MapAlert({ visible, onAdd, onClose }: Props) {
  const { colors } = useTheme();

  if (!visible) return null;

  return (
    <View
      style={{
        position: "absolute",

        top: 20,
        left: 20,
        right: 20,

        zIndex: 1000,

        backgroundColor: colors.card,

        padding: 18,

        borderRadius: 20,

        borderWidth: 1,
        borderColor: colors.border,

        shadowColor: colors.shadow,

        elevation: 6,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",

          color: colors.text,

          marginBottom: 8,
        }}
      >
        <Ionicons name="location" size={20} color={colors.primary} /> ස්ථානය
        තෝරාගන්නා ලදි
      </Text>

      <Text
        style={{
          color: colors.subText,

          fontSize: 15,

          marginBottom: 16,
        }}
      >
        මෙම ස්ථානයේ දන්සැලක් ඇතුලත් කරන්නද?
      </Text>

      <View
        style={{
          flexDirection: "row",

          gap: 10,
        }}
      >
        <Pressable
          onPress={onAdd}
          style={{
            flex: 1,

            backgroundColor: colors.primary,

            padding: 14,

            borderRadius: 12,

            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.buttonText,

              fontWeight: "600",
            }}
          >
            ඇතුලත් කරන්න
          </Text>
        </Pressable>

        <Pressable
          onPress={onClose}
          style={{
            flex: 1,

            backgroundColor: colors.inputBackground,

            padding: 14,

            borderRadius: 12,

            alignItems: "center",

            borderWidth: 1,

            borderColor: colors.border,
          }}
        >
          <Text
            style={{
              color: colors.text,
            }}
          >
            වසන්න
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
