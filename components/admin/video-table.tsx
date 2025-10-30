"use client";
import { useEffect, useState } from "react";
import { adminApi } from "./api";
import { Button } from "../ui/button";
import { useLanguage } from "../language-provider";

type Video = {
  id: string;
  title: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  storageUrl: string;
  thumbnailUrl?: string | null;
  createdAt: string;
};

export function VideoTable() {
  const { t } = useLanguage();
  const [rows, setRows] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminApi.listVideos();
      setRows(data);
    } catch (err: any) {
      setError(err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const publish = async (id: string) => {
    await adminApi.updateVideo(id, { status: "PUBLISHED", publishedAt: new Date().toISOString() });
    await load();
  };

  const archive = async (id: string) => {
    await adminApi.updateVideo(id, { status: "ARCHIVED" });
    await load();
  };

  const remove = async (id: string) => {
    await adminApi.deleteVideo(id);
    await load();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">{t.adminVideos}</h2>
        <Button variant="outline" size="sm" onClick={load}>{loading ? "..." : t.refresh}</Button>
      </div>
      {error ? <div className="text-sm text-red-600">{error}</div> : null}
      <div className="rounded-md border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-2">Title</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Created</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((v) => (
              <tr key={v.id} className="border-b">
                <td className="p-2">{v.title}</td>
                <td className="p-2">{v.status}</td>
                <td className="p-2">{new Date(v.createdAt).toLocaleString()}</td>
                <td className="p-2 flex gap-2">
                  {v.status !== "PUBLISHED" ? <Button size="sm" onClick={() => publish(v.id)}>{t.publish}</Button> : null}
                  {v.status !== "ARCHIVED" ? <Button size="sm" variant="secondary" onClick={() => archive(v.id)}>{t.archive}</Button> : null}
                  <Button size="sm" variant="destructive" onClick={() => remove(v.id)}>{t.del}</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


