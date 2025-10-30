"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { adminApi } from "./api";
import { useLanguage } from "../language-provider";

export function VideoForm({ onCreated }: { onCreated: () => void }) {
  const { t } = useLanguage();
  const [titleFr, setTitleFr] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [descriptionFr, setDescriptionFr] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbUrl, setThumbUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const { url } = await adminApi.uploadFile(file);
      setter(url);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await adminApi.createVideo({ titleFr, titleAr, descriptionFr, descriptionAr, storageUrl: videoUrl, thumbnailUrl: thumbUrl, status: "DRAFT" });
      setTitleFr(""); setTitleAr(""); setDescriptionFr(""); setDescriptionAr(""); setVideoUrl(""); setThumbUrl("");
      onCreated();
    } catch (err: any) {
      setError(err.message || "Create failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <Input placeholder={t.titleFr} value={titleFr} onChange={(e) => setTitleFr(e.target.value)} required />
      <Input placeholder={t.titleAr} value={titleAr} onChange={(e) => setTitleAr(e.target.value)} required />
      <Textarea placeholder={t.descriptionFr} value={descriptionFr} onChange={(e) => setDescriptionFr(e.target.value)} />
      <Textarea placeholder={t.descriptionAr} value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} />
      <div className="space-y-2">
        <div className="text-sm font-medium">{t.uploadVideo}</div>
        <Input type="file" accept="video/*" onChange={(e) => upload(e, setVideoUrl)} />
        {videoUrl ? <div className="text-xs text-muted-foreground break-all">{videoUrl}</div> : null}
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium">{t.uploadThumbnail}</div>
        <Input type="file" accept="image/*" onChange={(e) => upload(e, setThumbUrl)} />
        {thumbUrl ? <div className="text-xs text-muted-foreground break-all">{thumbUrl}</div> : null}
      </div>
      {error ? <div className="text-sm text-red-600">{error}</div> : null}
      <Button type="submit" disabled={busy || !videoUrl}>{busy ? "..." : t.createVideo}</Button>
    </form>
  );
}


