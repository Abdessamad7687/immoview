export type AuthRole = "ADMIN" | "USER";

const TOKEN_KEY = "auth.token";
const ROLE_KEY = "auth.role";

export function setAuth(token: string, role: AuthRole) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getRole(): AuthRole | null {
  if (typeof window === "undefined") return null;
  return (localStorage.getItem(ROLE_KEY) as AuthRole) || null;
}

export function isAuthenticated() {
  return !!getToken();
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";


