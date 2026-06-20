import type { returnType } from "@/types/returnType";
import { apiFetch } from "./apiFetch";
import { refreshAccessToken } from "./refreshToken";

type Props = {
  accessToken: string | null;
  refreshToken: string | null;
};

export async function getUserProfile({ accessToken, refreshToken }: Props) {
  try {
    const response = await apiFetch(`http://10.0.2.2:3000/api/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (data.code === "ACCESS_TOKEN_EXPIRED" && refreshToken) {
      const tokens = await refreshAccessToken(refreshToken);
      return await getUserProfile({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    }
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch user profile");
    }
    return {
      data: data.data,
      newTokens: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    } as returnType;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred");
  }
}
