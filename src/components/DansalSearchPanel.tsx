import React, { useState } from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { ChevronDown, Search, X } from "lucide-react-native";

import { useTranslation } from "react-i18next";
import { searchDansal } from "@/api/searchDansal";
import { useDansalContext } from "@/hooks/dansalHook";

export const DansalSearchPanel = ({ onClose }: { onClose: () => void }) => {
  const { setSearchDansal, setMode } = useDansalContext();

  const { t } = useTranslation();

  const [selectedDansalType, setSelectedDansalType] = useState("all");

  const [selectedDistance, setSelectedDistance] = useState(5);

  const [openDropdown, setOpenDropdown] = useState<
    "dansalType" | "distance" | null
  >(null);

  const dansalTypes = [
    {
      value: "all",
      displayName: t("search.dansalTypes.all"),
    },
    {
      value: "z",
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

  const selectedDansalTypeName = dansalTypes.find(
    (item) => item.value === selectedDansalType,
  )?.displayName;

  const selectedDistanceName = distances.find(
    (item) => item.value === selectedDistance,
  )?.displayName;

  const toggleDropdown = (dropdown: "dansalType" | "distance") => {
    setOpenDropdown((current) => (current === dropdown ? null : dropdown));
  };

  const handleSearch = async () => {
    try {
      const result = await searchDansal({
        type: selectedDansalType,
        distance: selectedDistance,
      });
      console.log("Search result:s", result.data.dansals);
      setSearchDansal(result.data.dansals);
      setMode("search");
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };

  return (
    <View style={styles.searchPanel}>
      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <View style={styles.header}>
        <Text style={styles.title}>{t("search.title")}</Text>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          activeOpacity={0.7}
        >
          <X size={20} color="#555" />
        </TouchableOpacity>
      </View>

      {/* ============================= */}
      {/* DANSAL TYPE */}
      {/* ============================= */}

      <Text style={styles.label}>{t("search.dansalType")}</Text>

      <TouchableOpacity
        style={styles.selectBox}
        activeOpacity={0.7}
        onPress={() => toggleDropdown("dansalType")}
      >
        <Text style={styles.selectText}>{selectedDansalTypeName}</Text>

        <ChevronDown size={18} color="#777" />
      </TouchableOpacity>

      {openDropdown === "dansalType" && (
        <View style={styles.dropdown}>
          {dansalTypes.map((type) => {
            const isSelected = selectedDansalType === type.value;

            return (
              <TouchableOpacity
                key={type.value}
                style={[
                  styles.dropdownItem,
                  isSelected && styles.selectedDropdownItem,
                ]}
                activeOpacity={0.7}
                onPress={() => {
                  setSelectedDansalType(type.value);
                  setOpenDropdown(null);
                }}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    isSelected && styles.selectedDropdownText,
                  ]}
                >
                  {type.displayName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* ============================= */}
      {/* DISTANCE */}
      {/* ============================= */}

      <Text style={styles.label}>{t("search.distance")}</Text>

      <TouchableOpacity
        style={styles.selectBox}
        activeOpacity={0.7}
        onPress={() => toggleDropdown("distance")}
      >
        <Text style={styles.selectText}>{selectedDistanceName}</Text>

        <ChevronDown size={18} color="#777" />
      </TouchableOpacity>

      {openDropdown === "distance" && (
        <View style={styles.dropdown}>
          {distances.map((distance) => {
            const isSelected = selectedDistance === distance.value;

            return (
              <TouchableOpacity
                key={distance.value}
                style={[
                  styles.dropdownItem,
                  isSelected && styles.selectedDropdownItem,
                ]}
                activeOpacity={0.7}
                onPress={() => {
                  setSelectedDistance(distance.value);
                  setOpenDropdown(null);
                }}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    isSelected && styles.selectedDropdownText,
                  ]}
                >
                  {distance.displayName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* ============================= */}
      {/* SEARCH BUTTON */}
      {/* ============================= */}

      <TouchableOpacity
        style={styles.searchButton}
        activeOpacity={0.8}
        onPress={() => {
          handleSearch();

          setOpenDropdown(null);
        }}
      >
        <Search size={19} color="#fff" />

        <Text style={styles.searchButtonText}>{t("search.searchDansals")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchPanel: {
    width: 290,

    backgroundColor: "#fff",

    borderRadius: 18,

    padding: 16,

    zIndex: 2000,
    elevation: 20,
  },

  /* ============================= */
  /* HEADER */
  /* ============================= */

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

  /* ============================= */
  /* LABEL */
  /* ============================= */

  label: {
    fontSize: 13,

    fontWeight: "600",

    color: "#444",

    marginTop: 10,

    marginBottom: 7,
  },

  /* ============================= */
  /* SELECT */
  /* ============================= */

  selectBox: {
    height: 44,

    borderWidth: 1,

    borderColor: "#e5e5e5",

    borderRadius: 10,

    paddingHorizontal: 12,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    backgroundColor: "#fff",
  },

  selectText: {
    flex: 1,

    fontSize: 14,

    color: "#333",
  },

  /* ============================= */
  /* DROPDOWN */
  /* ============================= */

  dropdown: {
    marginTop: 4,

    borderWidth: 1,

    borderColor: "#e5e5e5",

    borderRadius: 10,

    backgroundColor: "#fff",

    overflow: "hidden",

    maxHeight: 180,

    elevation: 5,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,

    shadowRadius: 5,
  },

  dropdownItem: {
    paddingHorizontal: 12,

    paddingVertical: 10,
  },

  selectedDropdownItem: {
    backgroundColor: "#fff4eb",
  },

  dropdownText: {
    fontSize: 13,

    color: "#444",
  },

  selectedDropdownText: {
    color: "#ff7a00",

    fontWeight: "600",
  },

  /* ============================= */
  /* SEARCH */
  /* ============================= */

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
