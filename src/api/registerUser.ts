import { apiFetch } from "./apiFetch";

type User = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser({ name, email, password }: User) {
  try {
    console.log("Registering user...");
    const res = await apiFetch(`http://10.0.2.2:3000/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to register user");
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Something went wrong");
  }
}
