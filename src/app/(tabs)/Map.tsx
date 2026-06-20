import { getDansal } from "@/api/getDansal";
import { AddDansalForm } from "@/components/AddDansalForm";
import { DansalBottomWindow } from "@/components/dansalBottomWindow";
import MapAlert from "@/components/MapAlert";
import { useTheme } from "@/hooks/themeHook";
import { dansalShort } from "@/types/dansalType";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef, useState } from "react";
import { Text, View } from "react-native";
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  Region,
} from "react-native-maps";

export default function MapScreen() {
  const [selected, setSelected] = useState<LatLng | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [markers, setMarkers] = useState<dansalShort[]>([]);
  const [isDansalVisible, setisDansalVisible] = useState(false);
  const [selectedDansal, setSelectedDansal] = useState<dansalShort | null>(
    null,
  );

  const { colors } = useTheme();

  const lastRegionRef = useRef<Region | null>(null);

  function handleDansalPress(dansal: dansalShort) {
    setSelected(null);
    setShowAlert(false);
    setSelectedDansal(dansal);
    setisDansalVisible(true);
  }
  console.log("Selected coordinate:", selected);
  function handleMapPress(event: MapPressEvent) {
    const coordinate = event.nativeEvent.coordinate;

    setSelected(coordinate);
    setShowAlert(true);
    setShowForm(false);
    setisDansalVisible(false);
  }

  async function handleGetDansal(region: Region) {
    try {
      if (!lastRegionRef.current) {
        lastRegionRef.current = region;
        const res = await getDansal(region);
        setMarkers(res.dansals);
        console.log("Fetched dansals:", res.dansals);
        return;
      }
      const latDiff = Math.abs(
        region.latitude - lastRegionRef.current.latitude,
      );

      const lngDiff = Math.abs(
        region.longitude - lastRegionRef.current.longitude,
      );

      if (latDiff > 0.01 || lngDiff > 0.01) {
        lastRegionRef.current = region;
        const res = await getDansal(region);
        setMarkers(res.dansals);
        console.log("Fetched dansals:", res.dansals);
      }
    } catch (error) {
      console.error("Error fetching dansals:", error);
    }
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
            දන්සල ඇතුලත් කිරීමට අදාල ස්ථානය මාර්ක් කරන්නA
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
      <DansalBottomWindow
        visible={isDansalVisible}
        onClose={() => {
          setisDansalVisible(false);
        }}
        selectedDansal={selectedDansal}
      />
      <MapView
        style={{ flex: 1 }}
        onRegionChangeComplete={handleGetDansal}
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
          }}
        />
        {selected && (
          <Marker
            coordinate={selected}
            title="දන්සැල"
            description="Selected place"
          />
        )}
        {markers.map((marker) => (
          <Marker
            onPress={(event) => {
              event.stopPropagation();
              handleDansalPress(marker);
            }}
            key={marker.id}
            coordinate={{
              latitude: marker.location[1],
              longitude: marker.location[0],
            }}
            title={marker.type}
            description="Dansal"
          />
        ))}
      </MapView>
    </View>
  );
}
