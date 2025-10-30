"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { API_BASE_URL, setAuth } from "../../lib/auth";
import { useAuth } from "../../hooks/use-auth";
import { AdminLoginDialog } from "./admin-login-dialog";

async function oauthCallback(provider: "GOOGLE" | "FACEBOOK") {
  // Placeholder: in a real flow, use provider SDK/redirect to get provider user id (or token)
  const providerUserId = crypto.randomUUID();
  const res = await fetch(`${API_BASE_URL}/auth/oauth/${provider.toLowerCase()}/callback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ providerUserId })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "OAuth failed");
  setAuth(data.accessToken, "USER");
}

export function LoginButton({ labelLogin, labelLogout, labelGoogle, labelFacebook, labelAdmin }: {
  labelLogin: string;
  labelLogout: string;
  labelGoogle: string;
  labelFacebook: string;
  labelAdmin: string;
}) {
  const { isLoggedIn, logout } = useAuth();
  const [loading, setLoading] = useState<"GOOGLE" | "FACEBOOK" | null>(null);

  if (isLoggedIn) {
    return <Button variant="outline" size="sm" onClick={logout}>{labelLogout}</Button>;
  }

  return (
    <div className="flex items-center gap-2">
      <AdminLoginDialog label={labelAdmin} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm">{labelLogin}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={async () => { try { setLoading("GOOGLE"); await oauthCallback("GOOGLE"); } finally { setLoading(null); } }}>
            {loading === "GOOGLE" ? "..." : labelGoogle}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={async () => { try { setLoading("FACEBOOK"); await oauthCallback("FACEBOOK"); } finally { setLoading(null); } }}>
            {loading === "FACEBOOK" ? "..." : labelFacebook}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}


