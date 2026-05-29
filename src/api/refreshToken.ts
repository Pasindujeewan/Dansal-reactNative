export async function refreshAccessToken(refreshToken: string) {
  console.log("Refreshing access token with refresh token:", refreshToken);
  try {
    const response = await fetch(`http://10.0.2.2:3000/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to refresh access token");
    }
    console.log("Refresh token is response:A", data);
    return data.token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Something went wrong");
  }
}
