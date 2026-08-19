import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { DansalSearchPanel } from "./DansalSearchPanel";
import {
  Search,
  Navigation,
  SlidersHorizontal,
  User,
  Menu,
} from "lucide-react-native";

export const MapSideMenu = () => {
  const [isSearchPanelVisible, setIsSearchPanelVisible] = useState(false);
  return (
    <View style={styles.container}>
      {/* Top menu */}
      {isSearchPanelVisible && (
        <DansalSearchPanel onClose={() => setIsSearchPanelVisible(false)} />
      )}
      {/* Map controls */}
      <View style={styles.sideMenu}>
        {/* Search */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setIsSearchPanelVisible(!isSearchPanelVisible)}
        >
          <Search size={21} color="#333" />
        </TouchableOpacity>

        {/* Current location */}
        <TouchableOpacity style={styles.iconButton}>
          <Navigation size={21} color="#ff7a00" />
        </TouchableOpacity>

        {/* Search radius */}
        <TouchableOpacity style={styles.iconButton}>
          <SlidersHorizontal size={21} color="#333" />
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity style={styles.iconButton}>
          <User size={21} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 55,
    right: 15,
    zIndex: 1000,
    pointerEvents: "box-none",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },

  sideMenu: {
    marginTop: 10,

    width: 50,

    backgroundColor: "#fff",

    borderRadius: 16,

    paddingVertical: 6,

    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,

    elevation: 6,
  },

  iconButton: {
    width: 49,
    height: 45,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 12,

    marginVertical: 3,
  },
});
