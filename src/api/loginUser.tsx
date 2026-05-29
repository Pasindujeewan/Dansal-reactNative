export async function loginUser(email: string, password: string) {
  try {
    const res = await fetch(`http://10.0.2.2:3000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to login user");
    }
    return data;
  } catch (error) {
    console.error("Error logging in user:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Something went wrong");
  }
}
