import { createContext, useContext, useState } from "react";
import { user } from "../types/userType";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { verifyUser } from "@/api/verifyUser";
import { ErrorAlert } from "@/components/errorAlert";

type AuthContextType = {
  user: user | null;
  loading: boolean;
  refreshToken: string | null;
  accessToken: string | null;
  login: (
    user: user,
    refreshToken: string | null,
    accessToken: string | null,
  ) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<user | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    loadAuth();
  }, []);

  async function loadAuth() {
    try {
      const storedRefreshToken = await SecureStore.getItemAsync("refreshToken");
      const storedAccessToken = await SecureStore.getItemAsync("accessToken");
      console.log("stored refresh token is", storedRefreshToken);
      console.log("aceesToken", storedAccessToken);
      if (!storedAccessToken && !storedRefreshToken) {
        return logout();
      }

      const verificationResult = await verifyUser(
        storedAccessToken,
        storedRefreshToken,
      );
      if (verificationResult.user) {
        await login(
          verificationResult.user,
          verificationResult.refreshToken,
          verificationResult.accessToken,
        );
        setUser(verificationResult.user);
        setRefreshToken(verificationResult.refreshToken);
        setAccessToken(verificationResult.accessToken);
        console.log("verification result is", verificationResult);
        console.log("user is", verificationResult.user);
      } else {
        await logout();
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      setShowError(true);
      console.log("error LIke thisA", error);
    } finally {
      setLoading(false);
    }
  }
  async function login(
    user: user,
    refreshToken: string | null,
    accessToken: string | null,
  ) {
    if (!refreshToken || !accessToken) {
      throw new Error("Tokens cannot be null");
    }
    await SecureStore.setItemAsync("user", JSON.stringify(user));
    await SecureStore.setItemAsync("refreshToken", refreshToken);
    await SecureStore.setItemAsync("accessToken", accessToken);
    setUser(user);
    setRefreshToken(refreshToken);
    setAccessToken(accessToken);
  }
  async function logout() {
    await SecureStore.deleteItemAsync("user");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("accessToken");
    setUser(null);
    setRefreshToken(null);
    setAccessToken(null);
  }
  return (
    <AuthContext.Provider
      value={{ user, loading, refreshToken, accessToken, login, logout }}
    >
      {children}
      <ErrorAlert
        visible={showError}
        message={error}
        onClose={() => setShowError(false)}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
