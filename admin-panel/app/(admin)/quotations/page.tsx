"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/primitives";

export default function QuotationsPage() {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { fetch("/api/quotations").then((r) => r.json()).then(setRows); }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Quotations</h1>
      <Card className="overflow-auto">
        <table className="text-sm"><thead><tr className="border-b text-left"><th>User</th><th>Title</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>{rows.map((r) => <tr key={r._id} className="border-b"><td>{r.userId?.businessName}</td><td>{r.title}</td><td>{r.amount}</td><td>{r.status}</td><td>{new Date(r.date).toLocaleDateString()}</td></tr>)}</tbody>
        </table>
      </Card>
    </div>
  );
}
