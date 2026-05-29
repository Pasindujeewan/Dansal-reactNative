import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LatLng } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/themeHook";
import * as DocumentPicker from "expo-document-picker";
import { getUrl } from "@/api/getUrl";
type Props = {
  cordinate: LatLng | null;
  onClose: () => void;
};

type FormData = {
  type: string;
  description: string;
  queueDistance: string | null;
  image: string | null;
};

const queueOptions = [
  "පෝලිම නැත",
  "මීටර් 10 ට අඩු",
  "මීටර් 10 - 50",
  "මීටර් 50 - 100",
  "මීටර් 100 ට වැඩි",
];

export function AddDansalForm({ cordinate, onClose }: Props) {
  const { colors } = useTheme();

  const [showExtraFields, setShowExtraFields] = useState(false);

  const [showQueueOptions, setShowQueueOptions] = useState(false);

  const [form, setForm] = useState<FormData>({
    type: "",
    description: "",
    queueDistance: null,
    image: null,
  });
  const [image, setImage] = useState<DocumentPicker.DocumentPickerAsset | null>(
    null,
  );

  const pickImage = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  function updateField(key: keyof FormData, value: string | null) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }
  async function handleSave() {
    console.log("Saving dansal with data:", form, cordinate);
    const url = await getUrl({ image });
    console.log("Image URL:", url);
  }
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={20}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        backgroundColor: colors.overlay,

        justifyContent: "center",

        zIndex: 9,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={{
          position: "absolute",

          top: 150,
          left: 15,
          right: 15,
          bottom: 60,

          backgroundColor: colors.card,

          padding: 18,

          borderRadius: 22,

          shadowColor: colors.shadow,
          shadowOpacity: 0.2,
          shadowRadius: 10,

          elevation: 8,
        }}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 30,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Close */}
        <Pressable
          onPress={onClose}
          style={{
            position: "absolute",

            top: 12,
            right: 12,

            width: 32,
            height: 32,

            borderRadius: 16,

            justifyContent: "center",
            alignItems: "center",

            backgroundColor: colors.inputBackground,

            zIndex: 100,
          }}
        >
          <Ionicons name="close" size={18} color={colors.error} />
        </Pressable>

        {/* Header */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",

            color: colors.text,

            marginBottom: 4,
          }}
        >
          දන්සල ඇතුලත් කිරීම
        </Text>

        <Text
          style={{
            color: colors.subText,
            marginBottom: 16,
          }}
        >
          දන්සලේ තොරතුරු ඇතුලත් කරන්න
        </Text>

        {/* Location */}
        <View
          style={{
            flexDirection: "row",

            alignItems: "center",

            backgroundColor: colors.mapBackground,

            padding: 10,

            borderRadius: 12,

            marginBottom: 16,
          }}
        >
          <Ionicons name="location" size={18} color={colors.primary} />

          <Text
            style={{
              marginLeft: 8,
              color: colors.text,
              flex: 1,
            }}
          >
            {cordinate?.latitude.toFixed(4)}
            {" , "}
            {cordinate?.longitude.toFixed(4)}
          </Text>
        </View>

        {/* Type */}
        <Text
          style={{
            color: colors.text,
            marginBottom: 6,
            fontWeight: "600",
          }}
        >
          දන්සල් වර්ගය
        </Text>

        <TextInput
          value={form.type}
          onChangeText={(value) => updateField("type", value)}
          placeholder="උදා: බත් දන්සල"
          placeholderTextColor={colors.placeholderText}
          style={{
            backgroundColor: colors.inputBackground,

            borderWidth: 1,
            borderColor: colors.border,

            borderRadius: 12,

            padding: 12,

            color: colors.text,

            marginBottom: 14,
          }}
        />

        {/* Description */}
        <Text
          style={{
            color: colors.text,
            marginBottom: 6,
            fontWeight: "600",
          }}
        >
          කෙටි විස්තරය
        </Text>

        <TextInput
          multiline
          numberOfLines={3}
          value={form.description}
          onChangeText={(value) => updateField("description", value)}
          placeholder="දන්සල පිළිබඳ කෙටි විස්තරයක්"
          placeholderTextColor={colors.placeholderText}
          style={{
            backgroundColor: colors.inputBackground,

            borderWidth: 1,
            borderColor: colors.border,

            borderRadius: 12,

            padding: 12,

            minHeight: 90,

            textAlignVertical: "top",

            color: colors.text,
          }}
        />

        {/* Extra Toggle */}
        <View
          style={{
            marginTop: 14,
          }}
        >
          <Pressable
            onPress={() => setShowExtraFields(!showExtraFields)}
            style={{
              flexDirection: "row",

              alignItems: "center",

              gap: 8,
            }}
          >
            <View
              style={{
                backgroundColor: colors.inputBackground,

                padding: 5,

                borderRadius: 20,
              }}
            >
              <Ionicons
                name={showExtraFields ? "chevron-up" : "chevron-down"}
                size={20}
                color={colors.text}
              />
            </View>

            <Text
              style={{
                color: colors.text,
              }}
            >
              අමතර විස්තර ඇතුලත් කරන්න
            </Text>
          </Pressable>

          {showExtraFields && (
            <View
              style={{
                marginTop: 16,
                gap: 14,
              }}
            >
              {/* Queue */}
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "600",
                }}
              >
                පෝලිමේ දුර
              </Text>

              <Pressable
                onPress={() => setShowQueueOptions(!showQueueOptions)}
                style={{
                  backgroundColor: colors.inputBackground,

                  borderWidth: 1,
                  borderColor: colors.border,

                  borderRadius: 12,

                  padding: 14,

                  flexDirection: "row",

                  justifyContent: "space-between",

                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: form.queueDistance
                      ? colors.text
                      : colors.placeholderText,
                  }}
                >
                  {form.queueDistance ?? "පෝලිමේ දුර තෝරන්න"}
                </Text>

                <Ionicons
                  name={showQueueOptions ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={colors.subText}
                />
              </Pressable>

              {showQueueOptions && (
                <View
                  style={{
                    borderRadius: 12,

                    overflow: "hidden",

                    borderWidth: 1,

                    borderColor: colors.border,
                  }}
                >
                  {queueOptions.map((item) => (
                    <Pressable
                      key={item}
                      onPress={() => {
                        updateField("queueDistance", item);

                        setShowQueueOptions(false);
                      }}
                      style={{
                        padding: 14,

                        backgroundColor: colors.inputBackground,

                        borderBottomWidth: 1,

                        borderColor: colors.border,
                      }}
                    >
                      <Text
                        style={{
                          color: colors.text,
                        }}
                      >
                        {item}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}

              {/* Image */}
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "600",
                }}
              >
                දන්සලේ ඡායාරූපය
              </Text>

              <Pressable
                onPress={pickImage}
                style={{
                  borderWidth: 1,
                  borderStyle: "dashed",
                  borderColor: colors.border,
                  borderRadius: 14,
                  padding: 20,
                  alignItems: "center",
                  backgroundColor: colors.inputBackground,
                }}
              >
                {image ? (
                  <Image
                    source={{ uri: image.uri }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                    }}
                    resizeMode="cover"
                  />
                ) : (
                  <>
                    <Ionicons name="camera" size={28} color={colors.primary} />

                    <Text
                      style={{
                        marginTop: 8,
                        color: colors.subText,
                      }}
                    >
                      ඡායාරූපයක් එක් කරන්න
                    </Text>
                  </>
                )}
              </Pressable>
            </View>
          )}
        </View>

        {/* Save */}
        <Pressable
          onPress={() => handleSave()}
          style={{
            marginTop: 20,

            backgroundColor: colors.primary,

            padding: 14,

            borderRadius: 14,

            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.buttonText,

              fontWeight: "700",
            }}
          >
            දන්සල සුරකින්න
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
