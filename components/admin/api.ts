"use client";
import { API_BASE_URL, getToken } from "../../lib/auth";

async function request(path: string, init?: RequestInit) {
  const token = getToken();
  const headers: HeadersInit = {
    ...(init?.headers || {}),
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(data?.error || res.statusText);
  return data;
}

export const adminApi = {
  listVideos: () => request(`/admin/videos`),
  createVideo: (payload: any) => request(`/admin/videos`, { method: "POST", body: JSON.stringify(payload) }),
  updateVideo: (id: string, payload: any) => request(`/admin/videos/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  deleteVideo: (id: string) => request(`/admin/videos/${id}`, { method: "DELETE" }),
  listUsers: () => request(`/admin/users`),
  uploadFile: async (file: File) => {
    const token = getToken();
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${API_BASE_URL}/uploads`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: form,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || res.statusText);
    return data as { url: string; filename: string };
  }
};


