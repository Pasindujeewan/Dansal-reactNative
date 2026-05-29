import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ErrorAlert } from "@/components/errorAlert";
import SuccessAlert from "@/components/sucsessAlert";
import { useTheme } from "../hooks/themeHook";
import GlobalLoader from "@/components/LoadingScreen";
import { useAuth } from "@/hooks/authHook";
import { loginUser } from "@/api/loginUser";

export default function LoginScreen() {
  const { colors } = useTheme();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const [isloading, setIsLoading] = useState(false);

  async function handleLogin() {
    setIsLoading(true);
    try {
      if (!email || !password) {
        setError("Please fill in all fields");
        setErrorVisible(true);
        return;
      }
      const res = await loginUser(email, password);
      await login(res.data.user, res.token.refreshToken, res.token.accessToken);
      setSuccessMessage("Login successful!");
      setIsSuccessVisible(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      setErrorVisible(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ErrorAlert
        message={error}
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
      />
      <SuccessAlert
        message={successMessage}
        visible={isSuccessVisible}
        onClose={() => {
          setIsSuccessVisible(false);
          router.replace("/(tabs)");
        }}
      />
      <GlobalLoader visible={isloading} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View
          style={[
            styles.logoContainer,
            {
              backgroundColor: colors.primary,
            },
          ]}
        >
          <Ionicons name="lock-closed" size={40} color="#fff" />
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
          {/* Title */}
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
          >
            Welcome Back
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: colors.subText,
              },
            ]}
          >
            Login to continue
          </Text>

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
              placeholderTextColor={colors.placeholderText}
              keyboardType="email-address"
              autoCapitalize="none"
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
              placeholderTextColor={colors.placeholderText}
              secureTextEntry={!showPassword}
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

          {/* Forgot Password */}
          <Pressable style={styles.forgotContainer}>
            <Text
              style={[
                styles.forgotText,
                {
                  color: colors.primary,
                },
              ]}
            >
              Forgot Password?
            </Text>
          </Pressable>

          {/* Login Button */}
          <Pressable
            onPress={handleLogin}
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
              Login
            </Text>
          </Pressable>

          {/* Bottom */}
          <View style={styles.bottomContainer}>
            <Text
              style={{
                color: colors.subText,
              }}
            >
              Don’t have an account?
            </Text>

            <Pressable
              onPress={() => {
                router.push("/Register");
              }}
            >
              <Text
                style={[
                  styles.signupText,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                {" "}
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContainer: {
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
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    marginTop: 8,
    marginBottom: 32,
    fontSize: 15,
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

  forgotContainer: {
    alignSelf: "flex-end",
    marginBottom: 26,
  },

  forgotText: {
    fontSize: 14,
    fontWeight: "600",
  },

  button: {
    height: 58,
    borderRadius: 16,

    justifyContent: "center",
    alignItems: "center",
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

  signupText: {
    fontWeight: "700",
  },
});
