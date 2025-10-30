"use client";
import { useEffect, useMemo, useState } from "react";
import { adminApi } from "./api";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

function groupByWeek(items: Array<{ createdAt: string }>) {
  const map = new Map<string, number>();
  for (const it of items) {
    const d = new Date(it.createdAt);
    const week = `${d.getFullYear()}-W${Math.ceil(((d.getTime() - new Date(d.getFullYear(),0,1).getTime())/86400000 + new Date(d.getFullYear(),0,1).getDay()+1)/7)}`;
    map.set(week, (map.get(week) || 0) + 1);
  }
  return Array.from(map.entries()).sort(([a],[b]) => a.localeCompare(b)).map(([week, count]) => ({ week, videos: count }));
}

export function DashboardCharts() {
  const [videoRows, setVideoRows] = useState<Array<{ createdAt: string }>>([]);
  const [userRows, setUserRows] = useState<Array<{ createdAt: string }>>([]);

  useEffect(() => {
    (async () => {
      try {
        const [v, u] = await Promise.all([adminApi.listVideos(), adminApi.listUsers()]);
        setVideoRows(v);
        setUserRows(u);
      } catch {}
    })();
  }, []);

  const videoSeries = useMemo(() => groupByWeek(videoRows), [videoRows]);
  const userSeries = useMemo(() => {
    const map = new Map<string, number>();
    for (const it of userRows) {
      const d = new Date(it.createdAt);
      const week = `${d.getFullYear()}-W${Math.ceil(((d.getTime() - new Date(d.getFullYear(),0,1).getTime())/86400000 + new Date(d.getFullYear(),0,1).getDay()+1)/7)}`;
      map.set(week, (map.get(week) || 0) + 1);
    }
    return Array.from(map.entries()).sort(([a],[b]) => a.localeCompare(b)).map(([week, count]) => ({ week, users: count }));
  }, [userRows]);

  const merged = useMemo(() => {
    const map = new Map<string, { week: string; videos?: number; users?: number }>();
    for (const p of videoSeries) map.set(p.week, { week: p.week, videos: p.videos, users: 0 });
    for (const p of userSeries) map.set(p.week, { week: p.week, videos: map.get(p.week)?.videos || 0, users: p.users });
    return Array.from(map.values());
  }, [videoSeries, userSeries]);

  return (
    <div className="rounded-2xl border p-4 overflow-x-auto">
      <div className="mb-2 text-sm text-muted-foreground">Weekly Videos & Users</div>
      <ChartContainer config={{ videos: { label: "Videos", color: "hsl(var(--primary))" }, users: { label: "Users", color: "hsl(var(--secondary))" } }} className="h-64 w-full">
        <AreaChart data={merged} margin={{ left: 12, right: 12, top: 8, bottom: 8 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="week" tickLine={false} axisLine={false} minTickGap={24} />
          <YAxis width={30} />
          <Area type="monotone" dataKey="videos" stroke="var(--color-videos)" fill="var(--color-videos)" fillOpacity={0.2} />
          <Area type="monotone" dataKey="users" stroke="var(--color-users)" fill="var(--color-users)" fillOpacity={0.2} />
          <ChartTooltip content={<ChartTooltipContent />} />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}


