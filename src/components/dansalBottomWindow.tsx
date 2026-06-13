import React, { useMemo, useRef } from "react";
import { View, Text, Button } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

type Props = {};

export function DansalBottomWindow() {
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  return (
    <BottomSheet index={2} snapPoints={snapPoints}>
      <View style={{ padding: 20 }}>
        <Text>Dansal Information</Text>
      </View>
    </BottomSheet>
  );
}
