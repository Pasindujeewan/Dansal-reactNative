export async function getSingleDansal(dansalId: string) {
  try {
    const res = await fetch(`http://10.0.2.2:3000/api/dansals/get/${dansalId}`);
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch dansals");
    }
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log("error occur when get dansal", error.message);
      throw error;
    }
    throw new Error("Something went wrong");
  }
}
