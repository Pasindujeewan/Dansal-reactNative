/**
 * File: src/components/sucsessAlert.tsx
 * Purpose: Modal component to display success messages to the user.
 * Exports: default `SuccessAlert` component.
 */
import { useTheme } from "@/hooks/themeHook";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

export default function SuccessAlert({ visible, message, onClose }: Props) {
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: colors.overlay,
          },
        ]}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              shadowColor: colors.shadow,
            },
          ]}
        >
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: colors.success + "20",
              },
            ]}
          >
            <Ionicons
              name="checkmark-circle"
              size={70}
              color={colors.success}
            />
          </View>

          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
          >
            Success
          </Text>

          <Text
            style={[
              styles.message,
              {
                color: colors.subText,
              },
            ]}
          >
            {message}
          </Text>

          <Pressable
            onPress={onClose}
            style={[
              styles.button,
              {
                backgroundColor: colors.primary,
              },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: colors.buttonText,
                },
              ]}
            >
              OK
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  card: {
    width: "100%",
    borderRadius: 24,
    padding: 24,

    alignItems: "center",

    borderWidth: 1,

    elevation: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.2,

    shadowRadius: 10,
  },

  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 999,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",

    marginBottom: 10,
  },

  message: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,

    marginBottom: 24,
  },

  button: {
    width: "100%",

    paddingVertical: 14,

    borderRadius: 14,

    alignItems: "center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
