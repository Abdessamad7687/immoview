"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL, setAuth } from "../../lib/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function AdminLoginDialog({ label }: { label: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Login failed");
      setAuth(data.accessToken, "ADMIN");
      setOpen(false);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">{label}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-3">
          <Input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error ? <div className="text-red-600 text-sm">{error}</div> : null}
          <Button type="submit" disabled={loading} className="w-full">{loading ? "..." : label}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}


