"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Card, Input } from "@/components/ui/primitives";

export default function UsersPage() {
  const [q, setQ] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  const load = async (query = "") => {
    const res = await fetch(`/api/users?q=${encodeURIComponent(query)}`);
    setUsers(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Users</h1>
      <div className="flex gap-2">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search users" />
        <Button onClick={() => load(q)}>Search</Button>
      </div>
      <Card className="overflow-auto">
        <table className="text-sm">
          <thead>
            <tr className="border-b text-left">
              <th>Business</th><th>Owner</th><th>Phone</th><th>Email</th><th>Plan</th><th>Expiry</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b">
                <td>{u.businessName}</td><td>{u.ownerName}</td><td>{u.phone}</td><td>{u.email}</td><td>{u.planType}</td>
                <td>{new Date(u.expiryDate).toLocaleDateString()}</td><td>{u.status}</td>
                <td className="space-x-2 py-2">
                  <Link href={`/users/${u._id}`} className="text-blue-600">View</Link>
                  <button onClick={async () => { await fetch(`/api/users/${u._id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: u.status === "suspended" ? "active" : "suspended" }) }); load(q); }}>
                    {u.status === "suspended" ? "Activate" : "Suspend"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
