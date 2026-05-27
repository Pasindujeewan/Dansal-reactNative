export async function registerUser() {
  console.log(process.env.EXPO_PUBLIC_API_URL);
  const res = await fetch(`http://10.0.2.2:3000/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "pasindu",
      email: "hello@",
      password: "test",
    }),
  });
  const data = await res.json();
  console.log(data);
}
