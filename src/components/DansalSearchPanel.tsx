import React from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { ChevronDown, Search, X } from "lucide-react-native";

import { useTranslation } from "react-i18next";

export const DansalSearchPanel = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();

  const dansalTypes = [
    {
      value: "all",
      displayName: t("search.dansalTypes.all"),
    },
    {
      value: "bath",
      displayName: t("search.dansalTypes.bath"),
    },
    {
      value: "rice_curry",
      displayName: t("search.dansalTypes.riceCurry"),
    },
    {
      value: "ice_cream",
      displayName: t("search.dansalTypes.iceCream"),
    },
    {
      value: "paan",
      displayName: t("search.dansalTypes.paan"),
    },
    {
      value: "tea_drinks",
      displayName: t("search.dansalTypes.teaDrinks"),
    },
    {
      value: "soup",
      displayName: t("search.dansalTypes.soup"),
    },
    {
      value: "fruit",
      displayName: t("search.dansalTypes.fruit"),
    },
    {
      value: "biscuit",
      displayName: t("search.dansalTypes.biscuit"),
    },
    {
      value: "water",
      displayName: t("search.dansalTypes.water"),
    },
    {
      value: "other",
      displayName: t("search.dansalTypes.other"),
    },
  ];

  const distances = [
    {
      value: 1,
      displayName: t("search.distances.one"),
    },
    {
      value: 2,
      displayName: t("search.distances.two"),
    },
    {
      value: 5,
      displayName: t("search.distances.five"),
    },
    {
      value: 10,
      displayName: t("search.distances.ten"),
    },
    {
      value: 25,
      displayName: t("search.distances.twentyFive"),
    },
    {
      value: 50,
      displayName: t("search.distances.fifty"),
    },
  ];

  return (
    <View style={styles.searchPanel}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t("search.title")}</Text>

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={20} color="#555" />
        </TouchableOpacity>
      </View>

      {/* ================================= */}
      {/* DANSAL TYPE */}
      {/* ================================= */}

      <Text style={styles.label}>{t("search.dansalType")}</Text>

      {/* Selected value */}
      <TouchableOpacity style={styles.selectBox}>
        <Text style={styles.selectedText}>{dansalTypes[0].displayName}</Text>

        <ChevronDown size={20} color="#666" />
      </TouchableOpacity>

      {/* Dansal Type Dropdown */}
      <View style={styles.dropdown}>
        {dansalTypes.map((type, index) => (
          <TouchableOpacity key={type.value} style={styles.dropdownItem}>
            <Text
              style={[
                styles.dropdownText,

                index === 0 && styles.selectedDropdownText,
              ]}
            >
              {type.displayName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ================================= */}
      {/* DISTANCE */}
      {/* ================================= */}

      <Text style={styles.label}>{t("search.distance")}</Text>

      {/* Selected value */}
      <TouchableOpacity style={styles.selectBox}>
        <Text style={styles.selectedText}>{distances[2].displayName}</Text>

        <ChevronDown size={20} color="#666" />
      </TouchableOpacity>

      {/* Distance Dropdown */}
      <View style={styles.dropdown}>
        {distances.map((distance, index) => (
          <TouchableOpacity key={distance.value} style={styles.dropdownItem}>
            <Text
              style={[
                styles.dropdownText,

                index === 2 && styles.selectedDropdownText,
              ]}
            >
              {distance.displayName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ================================= */}
      {/* SEARCH BUTTON */}
      {/* ================================= */}

      <TouchableOpacity style={styles.searchButton}>
        <Search size={19} color="#fff" />

        <Text style={styles.searchButtonText}>{t("search.searchDansals")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchPanel: {
    position: "absolute",

    zIndex: 1000,

    right: 20,

    top: 20,

    width: 290,

    backgroundColor: "#fff",

    borderRadius: 18,

    padding: 16,

    elevation: 8,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.18,

    shadowRadius: 12,
  },

  /* Header */

  header: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: 18,
  },

  title: {
    fontSize: 19,

    fontWeight: "700",

    color: "#222",
  },

  closeButton: {
    width: 32,

    height: 32,

    alignItems: "center",

    justifyContent: "center",

    borderRadius: 10,

    backgroundColor: "#f5f5f5",
  },

  /* Label */

  label: {
    fontSize: 13,

    fontWeight: "600",

    color: "#444",

    marginBottom: 7,

    marginTop: 10,
  },

  /* Select box */

  selectBox: {
    height: 46,

    borderWidth: 1,

    borderColor: "#e0e0e0",

    borderRadius: 11,

    paddingHorizontal: 13,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    backgroundColor: "#fafafa",
  },

  selectedText: {
    fontSize: 14,

    color: "#333",

    fontWeight: "500",

    flex: 1,
  },

  /* Dropdown */

  dropdown: {
    marginTop: 5,

    borderRadius: 11,

    backgroundColor: "#fff",

    borderWidth: 1,

    borderColor: "#eee",

    elevation: 5,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.12,

    shadowRadius: 6,

    maxHeight: 180,

    overflow: "hidden",
  },

  dropdownItem: {
    paddingVertical: 9,

    paddingHorizontal: 13,

    borderBottomWidth: 1,

    borderBottomColor: "#f2f2f2",
  },

  dropdownText: {
    fontSize: 12,

    color: "#555",
  },

  selectedDropdownText: {
    color: "#ff7a00",

    fontWeight: "600",
  },

  /* Search button */

  searchButton: {
    height: 46,

    marginTop: 20,

    borderRadius: 11,

    backgroundColor: "#ff7a00",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 8,
  },

  searchButtonText: {
    color: "#fff",

    fontSize: 14,

    fontWeight: "600",
  },
});
