"use client";
import { AdminSidebar } from "./sidebar";
import { AdminHeader } from "./header";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <AdminHeader />
      <div className="mx-auto max-w-7xl px-4 pt-4 flex gap-4 w-full overflow-x-hidden">
        <AdminSidebar />
        <main className="flex-1 pb-10 w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}


