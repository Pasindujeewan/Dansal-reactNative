import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/themeHook";
import { ErrorAlert } from "@/components/errorAlert";
import { registerUser } from "@/api/registerUser";
import GlobalLoader from "@/components/LoadingScreen";
import { useAuth } from "@/hooks/authHook";
import SuccessAlert from "@/components/sucsessAlert";
import { router } from "expo-router";

export default function RegisterScreen() {
  const { colors } = useTheme();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  async function handleRegister() {
    setIsLoading(true);
    try {
      if (
        name.trim() === "" ||
        email.trim() === "" ||
        password.trim() === "" ||
        confirmPassword.trim() === ""
      ) {
        setError("Please fill in all fields");
        setErrorVisible(true);
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setErrorVisible(true);
        return;
      }

      const res = await registerUser({ name, email, password });
      console.log("Registered user:", res.data.user);
      await login(res.data.user, res.token.refreshToken, res.token.accessToken);
      setIsSuccessVisible(true);
      setSuccessMessage("User registered successfully!");
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
      setErrorVisible(true);
    } finally {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsLoading(false);
    }
  }

  return (
    <>
      <GlobalLoader visible={isLoading} />
      <KeyboardAvoidingView
        style={[
          styles.screen,
          {
            backgroundColor: colors.background,
          },
        ]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SuccessAlert
          message={successMessage}
          visible={isSuccessVisible}
          onClose={() => {
            setIsSuccessVisible(false);
            router.replace("/(tabs)");
          }}
        />
        <ErrorAlert
          message={error}
          visible={errorVisible}
          onClose={() => setErrorVisible(false)}
        />

        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Icon */}
          <View
            style={[
              styles.logoContainer,
              {
                backgroundColor: colors.primary,
              },
            ]}
          >
            <Ionicons name="person-add" size={38} color="#fff" />
          </View>

          {/* Card */}
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
            <Text
              style={[
                styles.title,
                {
                  color: colors.text,
                },
              ]}
            >
              Create Account
            </Text>

            <Text
              style={[
                styles.subtitle,
                {
                  color: colors.subText,
                },
              ]}
            >
              Register to continue
            </Text>

            {/* Name */}
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.inputBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons name="person-outline" size={20} color={colors.icon} />

              <TextInput
                placeholder="Full Name"
                placeholderTextColor={colors.placeholderText}
                value={name}
                onChangeText={setName}
                style={[
                  styles.input,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>

            {/* Email */}
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.inputBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons name="mail-outline" size={20} color={colors.icon} />

              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={colors.placeholderText}
                value={email}
                onChangeText={setEmail}
                style={[
                  styles.input,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>

            {/* Password */}
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.inputBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={colors.icon}
              />

              <TextInput
                placeholder="Password"
                secureTextEntry={!showPassword}
                placeholderTextColor={colors.placeholderText}
                value={password}
                onChangeText={setPassword}
                style={[
                  styles.input,
                  {
                    color: colors.text,
                  },
                ]}
              />

              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color={colors.icon}
                />
              </Pressable>
            </View>

            {/* Confirm Password */}
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.inputBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color={colors.icon}
              />

              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor={colors.placeholderText}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={[
                  styles.input,
                  {
                    color: colors.text,
                  },
                ]}
              />

              <Pressable
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color={colors.icon}
                />
              </Pressable>
            </View>

            {/* Register Button */}
            <Pressable
              onPress={handleRegister}
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
                Create Account
              </Text>
            </Pressable>

            {/* Bottom Text */}
            <View style={styles.bottomContainer}>
              <Text
                style={{
                  color: colors.subText,
                }}
              >
                Already have an account?
              </Text>

              <Pressable>
                <Text
                  style={[
                    styles.loginText,
                    {
                      color: colors.primary,
                    },
                  ]}
                >
                  {" "}
                  Login
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,

    justifyContent: "center",
    alignItems: "center",

    alignSelf: "center",

    marginBottom: 28,
  },

  card: {
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.15,
    shadowRadius: 12,

    elevation: 8,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 32,
  },

  inputWrapper: {
    height: 58,
    borderRadius: 16,
    borderWidth: 1,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,
    gap: 12,

    marginBottom: 18,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  button: {
    height: 58,
    borderRadius: 16,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 10,
  },

  buttonText: {
    fontSize: 17,
    fontWeight: "700",
  },

  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28,
  },

  loginText: {
    fontWeight: "700",
  },
});
