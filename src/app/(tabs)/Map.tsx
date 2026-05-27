import { Text, View, Alert } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";
import { useState } from "react";
import { MapPressEvent } from "react-native-maps";
import MapAlert from "@/components/MapAlert";
import { useTheme } from "@/hooks/themeHook";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AddDansalForm } from "@/components/AddDansalForm";

export default function MapScreen() {
  const [selected, setSelected] = useState<LatLng | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { colors } = useTheme();

  function handleDansalPress() {
    setSelected(null);
    setShowAlert(false);
  }
  console.log("Selected coordinate:", selected);
  function handleMapPress(event: MapPressEvent) {
    const coordinate = event.nativeEvent.coordinate;

    setSelected(coordinate);
    setShowAlert(true);
    setShowForm(false);
  }
  return (
    <View style={{ flex: 1 }}>
      {showForm && (
        <AddDansalForm
          cordinate={selected}
          onClose={() => {
            console.log("Form closed");
            setShowForm(false);
          }}
        />
      )}

      {!showAlert && (
        <View
          style={{
            backgroundColor: colors.warning,
            paddingHorizontal: 12,
            paddingVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 14,
              fontWeight: "500",
              marginRight: 8,
            }}
          >
            දන්සල ඇතුලත් කිරීමට අදාල ස්ථානය මාර්ක් කරන්න
          </Text>
          <Ionicons name="close-circle" size={22} color={"black"} />
        </View>
      )}
      <MapAlert
        visible={showAlert}
        onAdd={() => {
          setShowForm(true);
          setShowAlert(false);
        }}
        onClose={() => setShowAlert(false)}
      />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 6.9271,
          longitude: 79.8612,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={handleMapPress}
      >
        <Marker
          coordinate={{ latitude: 6.9271, longitude: 79.8612 }}
          title="Colombo"
          description="Capital of Sri Lanka"
          onPress={(event) => {
            event.stopPropagation();
            handleDansalPress();
          }}
        />
        {selected && (
          <Marker
            coordinate={selected}
            title="දන්සැල"
            description="Selected place"
          />
        )}
      </MapView>
    </View>
  );
}
