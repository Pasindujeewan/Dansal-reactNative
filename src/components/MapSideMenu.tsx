import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  Search,
  MapPin,
  Navigation,
  SlidersHorizontal,
  User,
  Settings,
  Menu,
  X,
} from "lucide-react-native";

const MapSideMenu = () => {
  return (
    <View style={styles.container}>
      {/* Menu Button */}
      <TouchableOpacity style={styles.menuButton}>
        <Menu size={24} color="#222" />
      </TouchableOpacity>

      {/* Side Menu */}
      <View style={styles.sideMenu}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>

          <TouchableOpacity>
            <X size={24} color="#444" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#777" />

          <TextInput
            placeholder="Search location..."
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        {/* Current Location */}
        <TouchableOpacity style={styles.currentLocation}>
          <View style={styles.iconCircle}>
            <Navigation size={20} color="#fff" />
          </View>

          <View>
            <Text style={styles.optionTitle}>Current location</Text>
            <Text style={styles.optionSubtitle}>Use my current position</Text>
          </View>
        </TouchableOpacity>

        {/* Distance */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Search radius</Text>

            <SlidersHorizontal size={18} color="#777" />
          </View>

          <View style={styles.distanceRow}>
            {["1 km", "5 km", "10 km", "25 km"].map((distance, index) => (
              <TouchableOpacity
                key={distance}
                style={[
                  styles.distanceButton,
                  index === 1 && styles.distanceButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.distanceText,
                    index === 1 && styles.distanceTextActive,
                  ]}
                >
                  {distance}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nearby */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby</Text>

          <TouchableOpacity style={styles.nearbyOption}>
            <MapPin size={20} color="#666" />
            <Text style={styles.nearbyText}>Places around me</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Menu */}
        <View style={styles.bottomMenu}>
          <TouchableOpacity style={styles.bottomItem}>
            <User size={21} color="#555" />
            <Text style={styles.bottomText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomItem}>
            <Settings size={21} color="#555" />
            <Text style={styles.bottomText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MapSideMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  menuButton: {
    position: "absolute",
    top: 55,
    left: 20,
    zIndex: 10,

    width: 48,
    height: 48,
    borderRadius: 14,

    backgroundColor: "#fff",

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  sideMenu: {
    position: "absolute",

    top: 0,
    bottom: 0,
    left: 0,

    width: "82%",

    backgroundColor: "#fff",

    paddingTop: 60,
    paddingHorizontal: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
  },

  searchContainer: {
    height: 52,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#f5f5f5",

    borderRadius: 14,

    paddingHorizontal: 15,

    marginBottom: 20,
  },

  searchInput: {
    flex: 1,

    marginLeft: 10,

    fontSize: 15,
    color: "#222",
  },

  currentLocation: {
    flexDirection: "row",
    alignItems: "center",

    padding: 14,

    borderRadius: 14,

    backgroundColor: "#f8f8f8",
  },

  iconCircle: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "#ff7a00",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 12,
  },

  optionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },

  optionSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 3,
  },

  section: {
    marginTop: 28,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",

    marginBottom: 12,
  },

  distanceRow: {
    flexDirection: "row",
    gap: 8,
  },

  distanceButton: {
    paddingVertical: 10,
    paddingHorizontal: 13,

    borderRadius: 10,

    backgroundColor: "#f2f2f2",
  },

  distanceButtonActive: {
    backgroundColor: "#ff7a00",
  },

  distanceText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500",
  },

  distanceTextActive: {
    color: "#fff",
  },

  nearbyOption: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 12,
  },

  nearbyText: {
    marginLeft: 12,

    fontSize: 15,
    color: "#444",
  },

  bottomMenu: {
    position: "absolute",

    left: 20,
    right: 20,
    bottom: 35,

    borderTopWidth: 1,
    borderTopColor: "#eee",

    paddingTop: 20,

    flexDirection: "row",
    justifyContent: "space-around",
  },

  bottomItem: {
    alignItems: "center",
    gap: 5,
  },

  bottomText: {
    fontSize: 12,
    color: "#666",
  },
});
