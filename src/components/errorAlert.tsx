import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/themeHook";

type Props = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

export function ErrorAlert({ visible, message, onClose }: Props) {
  const { colors } = useTheme();

  const [show, setShow] = useState(visible);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  function handleClose() {
    setShow(false);
    onClose();
  }

  if (!show) return null;

  return (
    <Modal transparent animationType="fade" visible={show}>
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
            styles.container,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              shadowColor: colors.shadow,
            },
          ]}
        >
          {/* Close Button */}
          <Pressable onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.icon} />
          </Pressable>

          {/* Error Icon */}
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: colors.error,
              },
            ]}
          >
            <Ionicons name="alert" size={34} color="#fff" />
          </View>

          {/* Title */}
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
          >
            Error
          </Text>

          {/* Message */}
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

          {/* OK Button */}
          <Pressable
            onPress={handleClose}
            style={[
              styles.okButton,
              {
                backgroundColor: colors.error,
              },
            ]}
          >
            <Text
              style={[
                styles.okText,
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
    padding: 20,
  },

  container: {
    width: "100%",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,

    alignItems: "center",

    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  closeButton: {
    position: "absolute",
    top: 14,
    right: 14,
    zIndex: 10,
  },

  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 18,
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

  okButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",
  },

  okText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
