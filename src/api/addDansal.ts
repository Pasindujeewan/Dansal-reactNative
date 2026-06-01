import { refreshAccessToken } from "./refreshToken";
type Props = {
  type: string;
  description: string;
  queueDistance: string | null;
  imageUrl: string | null;
  coordinates: number[]; // longitude, latitude
  accessToken: string | null;
  refreshToken: string | null;
};
type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type returnRes = {
  data: any;
  newTokens: Tokens;
};
export async function addDansal({
  type,
  description,
  queueDistance,
  imageUrl,
  coordinates,
  accessToken,
  refreshToken,
}: Props) {
  try {
    const res = await fetch("http://10.0.2.2:3000/api/dansals/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        type,
        description,
        queueDistance,
        imageUrl,
        coordinates,
      }),
    });
    const data = await res.json();
    if (data.code === "ACCESS_TOKEN_EXPIRED" && refreshToken) {
      const tokens = await refreshAccessToken(refreshToken);

      return await addDansal({
        type,
        description,
        queueDistance,
        imageUrl,
        coordinates,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    }
    if (!res.ok || !data.success) {
      throw new Error(data.message || "dansal add failed");
    }
    return { data, newTokens: { accessToken, refreshToken } } as returnRes;
  } catch (error) {
    console.log("error occur when add dansal", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Something went wrong");
  }
}
