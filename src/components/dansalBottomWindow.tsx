import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { scheduleOnRN } from "react-native-worklets";
import { useTheme } from "@/hooks/themeHook";
import type { dansalShort } from "@/types/dansalType";
import { dansal } from "@/types/dansalType";
import { getSingleDansal } from "@/api/getSingleDansal";

const SNAP_POINTS = [50, 100, 500];

type Props = {
  visible: boolean;
  onClose: () => void;
  selectedDansal: dansalShort | null;
};

export function DansalBottomWindow({
  visible,
  onClose,
  selectedDansal,
}: Props) {
  const { colors } = useTheme();

  const height = useSharedValue(100);

  const [details, setDetails] = useState<dansal | null>(null);
  const [loading, setLoading] = useState(false);
  const [sheetLevel, setSheetLevel] = useState(1);

  async function fetchDetails() {
    if (!selectedDansal?.id || details) return;

    try {
      setLoading(true);

      const data = await getSingleDansal(selectedDansal.id);

      setDetails(data.dansal);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  console.log("my dansal", details);
  useEffect(() => {
    if (sheetLevel === 2 && selectedDansal?.id && !details) {
      fetchDetails();
    }
  }, [sheetLevel, selectedDansal, selectedDansal?.id]);

  const expandSheet = () => {
    const current = height.value;

    if (current === SNAP_POINTS[0]) {
      height.value = withTiming(SNAP_POINTS[1], {
        duration: 250,
      });
      setSheetLevel(1);
    } else if (current == SNAP_POINTS[1]) {
      height.value = withTiming(SNAP_POINTS[2], {
        duration: 250,
      });
      setSheetLevel(2);
    }

    console.log("expanding new ");

    fetchDetails();
  };
  useEffect(() => {
    setDetails(null);
  }, [selectedDansal?.id]);

  const collapseSheet = () => {
    const current = height.value;

    if (current === SNAP_POINTS[2]) {
      height.value = withTiming(SNAP_POINTS[1], {
        duration: 250,
      });
      setSheetLevel(1);
    } else if (current === SNAP_POINTS[1]) {
      height.value = withTiming(SNAP_POINTS[0], {
        duration: 250,
      });
      setSheetLevel(0);
    }

    if (current === 250) {
    }
  };

  const dragGesture = Gesture.Pan().onEnd((event) => {
    if (event.translationY < -50) {
      scheduleOnRN(expandSheet);
    }

    if (event.translationY > 50) {
      scheduleOnRN(collapseSheet);
    }
  });

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  if (!visible || !selectedDansal) {
    return null;
  }

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: colors.card,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: 20,
          elevation: 10,
          zIndex: 100,
        },
        animatedStyle,
      ]}
    >
      <GestureDetector gesture={dragGesture}>
        <View
          style={{
            width: 40,
            height: 5,
            backgroundColor: colors.border,
            borderRadius: 10,
            alignSelf: "center",
            marginBottom: 20,
          }}
        />
      </GestureDetector>

      {sheetLevel !== 0 && (
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: colors.text,
            marginBottom: 16,
          }}
        >
          {selectedDansal.type}
        </Text>
      )}
      {sheetLevel === 2 && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {loading ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 40,
              }}
            >
              <ActivityIndicator size="large" color={colors.primary} />
              <Text
                style={{
                  color: colors.subText,
                  marginTop: 12,
                }}
              >
                Loading dansal details...
              </Text>
            </View>
          ) : details ? (
            <>
              {/* Dansal Image */}
              {details.imgUrl ? (
                <Image
                  source={{ uri: details.imgUrl }}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: 180,
                    borderRadius: 18,
                    marginBottom: 16,
                  }}
                />
              ) : null}

              {/* Description Card */}
              <View
                style={{
                  backgroundColor: colors.background,
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 18,
                    fontWeight: "700",
                    marginBottom: 10,
                  }}
                >
                  Description
                </Text>

                <Text
                  style={{
                    color: colors.subText,
                    lineHeight: 22,
                  }}
                >
                  {details.description || "No description available"}
                </Text>
              </View>

              {/* Information Card */}
              <View
                style={{
                  backgroundColor: colors.background,
                  borderRadius: 16,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 18,
                    fontWeight: "700",
                    marginBottom: 14,
                  }}
                >
                  Information
                </Text>

                {/* Queue Length */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  }}
                >
                  <Text
                    style={{
                      color: colors.subText,
                    }}
                  >
                    Queue Length
                  </Text>

                  <Text
                    style={{
                      color: colors.text,
                      fontWeight: "600",
                    }}
                  >
                    {details.queueLength}
                  </Text>
                </View>

                {/* Created By */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  }}
                >
                  <Text
                    style={{
                      color: colors.subText,
                    }}
                  >
                    Created By
                  </Text>

                  <Text
                    style={{
                      color: colors.text,
                      fontWeight: "600",
                    }}
                    numberOfLines={1}
                  >
                    {details.createdBy}
                  </Text>
                </View>

                {/* Coordinates */}
                <View
                  style={{
                    paddingTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: colors.subText,
                      marginBottom: 6,
                    }}
                  >
                    Location
                  </Text>

                  <Text
                    style={{
                      color: colors.text,
                      fontWeight: "600",
                    }}
                  >
                    {details.location[0]}, {details.location[1]}
                  </Text>
                </View>
              </View>

              {/* Bottom spacing */}
              <View style={{ height: 30 }} />
            </>
          ) : (
            <View
              style={{
                alignItems: "center",
                paddingVertical: 30,
              }}
            >
              <Text
                style={{
                  color: colors.subText,
                }}
              >
                No details available
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </Animated.View>
  );
}
