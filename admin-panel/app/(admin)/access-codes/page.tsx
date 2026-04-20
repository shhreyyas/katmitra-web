"use client";

import { useEffect, useState } from "react";
import { Button, Card, Input } from "@/components/ui/primitives";

export default function AccessCodesPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [planType, setPlanType] = useState("1M");
  const [count, setCount] = useState(1);

  const load = async () => setRows(await (await fetch("/api/access-codes")).json());
  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Access Codes</h1>
      <Card className="flex flex-wrap gap-2">
        <select className="rounded-md border px-3 py-2" value={planType} onChange={(e) => setPlanType(e.target.value)}>
          <option value="1M">1 Month</option><option value="6M">6 Months</option><option value="12M">12 Months</option>
        </select>
        <Input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-32" />
        <Button onClick={async () => { await fetch("/api/access-codes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ planType, count }) }); load(); }}>
          Generate
        </Button>
      </Card>
      <Card className="overflow-auto">
        <table className="text-sm">
          <thead><tr className="border-b text-left"><th>Code</th><th>Plan</th><th>Status</th><th>User</th><th>Created</th><th>Actions</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r._id} className="border-b">
                <td>{r.code}</td><td>{r.planType}</td><td>{r.status}</td><td>{r.assignedUser?.businessName ?? "-"}</td><td>{new Date(r.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={async () => { await fetch("/api/access-codes", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: r._id, status: "disabled" }) }); load(); }}>
                    Disable
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
