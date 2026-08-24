import { StyleSheet, View, Text, Pressable } from "react-native";
import { useDansalContext } from "@/hooks/dansalHook";
import { ArrowLeft } from "lucide-react-native";

export function MapSearchAlert() {
  const { searchDansal, setMode, setSearchDansal } = useDansalContext();
  if (searchDansal.length === 0) return null;
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setMode("all");
          setSearchDansal([]);
        }}
      >
        <View
          style={{
            marginRight: 15,
            backgroundColor: "rgba(50, 48, 48, 0.53)",
            padding: 6,
            borderRadius: 100,
          }}
        >
          <ArrowLeft color="white" size={25} />
        </View>
      </Pressable>
      <View>
        {searchDansal.length > 0 ? (
          <Text style={{ color: "white", fontSize: 15 }}>
            {searchDansal.length}{" "}
            {searchDansal.length > 1 ? "Dansals found" : "Dansal found"}
          </Text>
        ) : (
          <Text style={{ color: "white", fontSize: 15 }}>No Dansals found</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1000,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
  },
});
