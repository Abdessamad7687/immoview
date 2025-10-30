"use client";
import { useEffect, useState } from "react";
import { adminApi } from "./api";

type User = {
  id: string;
  email: string;
  name?: string | null;
  createdAt: string;
  isActive: boolean;
};

export function UsersTable() {
  const [rows, setRows] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        const data = await adminApi.listUsers();
        setRows(data);
      } catch (err: any) {
        setError(err.message || "Failed to load");
      }
    })();
  }, []);

  return (
    <div className="space-y-3">
      <h2 className="font-semibold">Users</h2>
      {error ? <div className="text-sm text-red-600">{error}</div> : null}
      <div className="rounded-md border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Active</th>
              <th className="text-left p-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.name || "—"}</td>
                <td className="p-2">{u.isActive ? "Yes" : "No"}</td>
                <td className="p-2">{new Date(u.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


