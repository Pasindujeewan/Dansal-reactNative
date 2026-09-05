import { getDansal, SyncedMapTile } from "@/api/getDansal";
import { AddDansalForm } from "@/components/AddDansalForm";
import { DansalBottomWindow } from "@/components/dansalBottomWindow";
import MapAlert from "@/components/MapAlert";
import { useTheme } from "@/hooks/themeHook";
import { dansalShort } from "@/types/dansalType";
import { useRef, useState } from "react";
import { Text, View } from "react-native";
import { MapSideMenu } from "@/components/MapSideMenu";
import { MapSearchAlert } from "@/components/MapSearchAlert";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getDansalColor } from "@/utilis/getDansalColur";

import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  Region,
} from "react-native-maps";
import { useDansalContext } from "@/hooks/dansalHook";

export default function MapScreen() {
  const { searchDansal, mode, allDansal, fetchDansal } = useDansalContext();

  const [selected, setSelected] = useState<LatLng | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [markers, setMarkers] = useState<dansalShort[]>([]);
  const [isDansalVisible, setisDansalVisible] = useState(false);
  const [selectedDansal, setSelectedDansal] = useState<dansalShort | null>(
    null,
  );

  const { colors } = useTheme();

  const mapRef = useRef<MapView | null>(null);

  function handleDansalPress(dansal: dansalShort) {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: dansal.location[1],
        longitude: dansal.location[0],
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
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
  function handleGetDansal(region: Region) {
    fetchDansal(region);
  }

  return (
    <View style={{ flex: 1 }}>
      <MapSearchAlert />
      {showForm && (
        <AddDansalForm
          cordinate={selected}
          onClose={() => {
            console.log("Form closed");
            setShowForm(false);
          }}
        />
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
        ref={mapRef}
      >
        {selected && (
          <Marker
            coordinate={selected}
            title="දන්සැල"
            description="Selected place"
          />
        )}
        {mode === "search"
          ? searchDansal.length > 0 &&
            searchDansal.map((marker) => (
              <Marker
                key={marker.id}
                onPress={(event) => {
                  event.stopPropagation();
                  handleDansalPress(marker);
                }}
                coordinate={{
                  latitude: marker.location[1],
                  longitude: marker.location[0],
                }}
                title={marker.label}
                description="Dansal"
              >
                <MaterialCommunityIcons
                  name="map-marker"
                  size={35}
                  color={getDansalColor(marker.value)}
                />
              </Marker>
            ))
          : allDansal.map((marker) => (
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
                title={marker.label}
                description="Dansal"
              >
                <MaterialCommunityIcons
                  name="map-marker"
                  size={35}
                  color={getDansalColor(marker.value)}
                />
              </Marker>
            ))}
      </MapView>
      <MapSideMenu />
    </View>
  );
}
