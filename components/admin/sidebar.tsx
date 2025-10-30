"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "../language-provider";

type TabKey = "dashboard" | "videos" | "users";

const items: Array<{ key: TabKey; label: string }> = [
  { key: "dashboard", label: "Dashboard" },
  { key: "videos", label: "Videos" },
  { key: "users", label: "Users" },
];

export function AdminSidebar() {
  const router = useRouter();
  const sp = useSearchParams();
  const tab = (sp.get("tab") as TabKey) || "dashboard";
  const { t } = useLanguage();

  const setTab = (key: TabKey) => {
    const qs = new URLSearchParams(sp?.toString());
    qs.set("tab", key);
    router.push(`/admin?${qs.toString()}`);
  };

  return (
    <aside className="hidden md:block w-60 shrink-0">
      <div className="sticky top-16 space-y-1 p-2">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => setTab(it.key)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-xl transition-colors",
              tab === it.key
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted"
            )}
          >
            {it.key === "dashboard" ? t.adminDashboard : it.key === "videos" ? t.adminVideos : t.adminUsers}
          </button>
        ))}
      </div>
    </aside>
  );
}


