"use client";
import { useEffect, useState, useCallback } from "react";
import { getRole, getToken, clearAuth } from "../lib/auth";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<ReturnType<typeof getRole>>(null);

  useEffect(() => {
    setToken(getToken());
    setRole(getRole());
    const onStorage = (e: StorageEvent) => {
      if (e.key === "auth.token" || e.key === "auth.role") {
        setToken(getToken());
        setRole(getRole());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setToken(null);
    setRole(null);
  }, []);

  return { token, role, isLoggedIn: !!token, logout };
}


