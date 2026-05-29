import { View, Animated, Easing, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

type Props = {
  visible?: boolean;
};

function Dot({ delay }: { delay: number }) {
  const move = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(move, {
          toValue: -10,
          duration: 250,
          delay,
          easing: Easing.linear,
          useNativeDriver: true,
        }),

        Animated.timing(move, {
          toValue: 0,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          transform: [{ translateY: move }],
        },
      ]}
    />
  );
}

export default function GlobalLoader({ visible = false }: Props) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.row}>
        <Dot delay={0} />
        <Dot delay={120} />
        <Dot delay={240} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,

    backgroundColor: "rgba(0,0,0,0.4)",

    justifyContent: "center",
    alignItems: "center",

    zIndex: 999,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 999,
    backgroundColor: "#fff",
  },
});
