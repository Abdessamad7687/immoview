"use client";
import { useEffect, useState } from "react";
import { adminApi } from "./api";

export function KpiCards() {
  const [videos, setVideos] = useState(0);
  const [published, setPublished] = useState(0);
  const [drafts, setDrafts] = useState(0);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const [v, u] = await Promise.all([adminApi.listVideos(), adminApi.listUsers()]);
        setVideos(v.length);
        setPublished(v.filter((x: any) => x.status === "PUBLISHED").length);
        setDrafts(v.filter((x: any) => x.status === "DRAFT").length);
        setUsers(u.length);
      } catch {
        // ignore for KPI
      }
    })();
  }, []);

  const Card = ({ title, value }: { title: string; value: number }) => (
    <div className="w-full min-w-0 rounded-2xl border bg-gradient-to-br from-background to-muted/50 p-4 shadow-sm">
      <div className="text-xs sm:text-sm text-muted-foreground truncate">{title}</div>
      <div className="mt-1 text-xl sm:text-2xl md:text-3xl font-semibold break-words">{value}</div>
    </div>
  );

  return (
    <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(11rem,1fr))] w-full">
      <Card title="Total Videos" value={videos} />
      <Card title="Published" value={published} />
      <Card title="Drafts" value={drafts} />
      <Card title="Total Users" value={users} />
    </div>
  );
}


