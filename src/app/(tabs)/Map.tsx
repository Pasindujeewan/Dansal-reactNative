import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Map Screen here</Text>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 6.9271,
          longitude: 79.8612,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: 6.9271,
            longitude: 79.8612,
          }}
          title="Dansal"
          description="Free food"
        />
      </MapView>
    </View>
  );
}
