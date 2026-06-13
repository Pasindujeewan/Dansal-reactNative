import { Text, View } from "react-native";

type AvatarProps = {
  name: string | null;
  size?: number;
};

export default function Avatar({ name, size = 48 }: AvatarProps) {
  const getInitials = (name: string | null) => {
    if (!name) {
      return;
    }
    const words = name.trim().split(/\s+/);

    // Multiple words  first character of first and last word
    if (words.length > 1) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
    if (words[0].length == 1) {
      return words[0][0];
    }

    // Single word
    return words[0].slice(0, 2).toUpperCase();
  };

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          color: "#0b0101",
          fontWeight: "bold",
          fontSize: size * 0.4,
        }}
      >
        {getInitials(name)}
      </Text>
    </View>
  );
}
