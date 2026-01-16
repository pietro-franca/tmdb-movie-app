import { backendApi } from "../api/axios";

export async function login(email: string, password: string) {
  await backendApi.post("/auth/login", { email, password });
}

export async function register(username: string, email: string, password: string) {
  await backendApi.post("/auth/register", { username, email, password });
}

export async function logout() {
  await backendApi.post("/auth/logout");
  // cache armazenado no local storage é limpo após o logout
  localStorage.clear();
}

export async function getMe() {
  const response = await backendApi.get("/auth/me");
  return response.data;
}
