import { apiFetch } from "./apiFetch";
import { refreshAccessToken } from "./refreshToken";

export async function verifyUser(
  accessToken: string | null,
  refreshToken: string | null,
) {
  try {
    const response = await apiFetch("http://10.0.2.2:3000/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (data.code === "ACCESS_TOKEN_EXPIRED" && refreshToken) {
      const tokens = await refreshAccessToken(refreshToken);

      return await verifyUser(tokens.accessToken, tokens.refreshToken);
    }
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to verify user");
    }

    return {
      user: data.data.user,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error("Error verifying user:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Something went wrong");
  }
}
