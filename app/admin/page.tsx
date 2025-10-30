"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRole, getToken, clearAuth } from "../../lib/auth";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { VideoForm } from "../../components/admin/video-form";
import { VideoTable } from "../../components/admin/video-table";
import { UsersTable } from "../../components/admin/users-table";
import { useSearchParams } from "next/navigation";
import { AdminShell } from "../../components/admin/shell";
import { KpiCards } from "../../components/admin/kpis";
import { DashboardCharts } from "../../components/admin/dashboard-charts";

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checked, setChecked] = useState(false);
  const sp = useSearchParams();
  const tab = sp.get("tab") || "dashboard";

  useEffect(() => {
    const role = getRole();
    const token = getToken();
    if (role === "ADMIN" && token) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (!authorized) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold mb-3">Access denied</h1>
        <p className="text-muted-foreground mb-6">You must be logged in as admin to view this page.</p>
        <div className="flex gap-2">
          <Button onClick={() => router.push("/")}>Go Home</Button>
          <Button variant="outline" onClick={() => { clearAuth(); router.refresh(); }}>Logout</Button>
        </div>
      </div>
    );
  }

  return (
    <AdminShell>
      {tab === "dashboard" ? (
        <div className="grid gap-6">
          <KpiCards />
          <DashboardCharts />
        </div>
      ) : null}
      {tab === "videos" ? (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border p-4">
            <h2 className="font-semibold mb-2">Create Video</h2>
            <VideoForm onCreated={() => {}} />
          </div>
          <div className="rounded-2xl border p-4 md:col-span-2">
            <VideoTable />
          </div>
        </div>
      ) : null}
      {tab === "users" ? (
        <div className="rounded-2xl border p-4">
          <UsersTable />
        </div>
      ) : null}
      
    </AdminShell>
  );
}


