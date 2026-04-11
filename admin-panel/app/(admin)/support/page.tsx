"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/primitives";

export default function SupportPage() {
  const [rows, setRows] = useState<any[]>([]);
  const load = async () => setRows(await (await fetch("/api/support")).json());
  useEffect(() => { load(); }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Support Tickets</h1>
      <Card><table className="text-sm"><thead><tr className="border-b text-left"><th>User</th><th>Message</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>{rows.map((r)=><tr key={r._id} className="border-b"><td>{r.userId?.businessName}</td><td>{r.message}</td><td>{r.status}</td><td><button onClick={async()=>{await fetch('/api/support',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:r._id,status:'closed'})});load();}}>Mark Resolved</button></td></tr>)}</tbody></table></Card>
    </div>
  );
}
