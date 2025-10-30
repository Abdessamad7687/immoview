"use client";
import { useSearchParams } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { useAuth } from "../../hooks/use-auth";
import { clearAuth } from "../../lib/auth";
import { useRouter } from "next/navigation";
import { useLanguage } from "../language-provider";
import { useTheme } from "../theme-provider";
import { Moon, Sun } from "lucide-react";

export function AdminHeader() {
  const sp = useSearchParams();
  const tab = sp.get("tab") || "dashboard";
  const { logout } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const title = tab.charAt(0).toUpperCase() + tab.slice(1);

  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/70 border-b">
      <div className="h-14 flex items-center justify-between px-4">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">{t.adminDashboard}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={() => { clearAuth(); logout(); }}>{t.adminLogout}</Button>
        </div>
      </div>
      {/* Mobile nav */}
      <div className="md:hidden px-4 pb-3">
        <div className="grid grid-cols-3 gap-3">
          {[
            { k: "dashboard", l: t.adminDashboard },
            { k: "videos", l: t.adminVideos },
            { k: "users", l: t.adminUsers },
          ].map((it) => (
            <Button
              key={it.k}
              size="sm"
              variant={tab === it.k ? "default" : "outline"}
              className="justify-center"
              onClick={() => {
                const qs = new URLSearchParams(sp?.toString());
                qs.set("tab", it.k);
                router.push(`/admin?${qs.toString()}`);
              }}
            >
              {it.l}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}


