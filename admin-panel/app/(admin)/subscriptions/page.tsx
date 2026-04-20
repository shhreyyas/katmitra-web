"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/primitives";

export default function SubscriptionsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const load = async () => setRows(await (await fetch("/api/subscriptions")).json());
  useEffect(() => { load(); }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Subscriptions</h1>
      <Card className="overflow-auto">
        <table className="text-sm"><thead><tr className="border-b text-left"><th>User</th><th>Plan</th><th>Start</th><th>End</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{rows.map((r) => <tr key={r._id} className="border-b"><td>{r.userId?.businessName}</td><td>{r.planType}</td><td>{new Date(r.startDate).toLocaleDateString()}</td><td>{new Date(r.endDate).toLocaleDateString()}</td><td>{r.status}</td><td className="space-x-2"><button onClick={async()=>{await fetch('/api/subscriptions',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:r._id,action:'activate'})});load();}}>Activate</button><button onClick={async()=>{await fetch('/api/subscriptions',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:r._id,action:'extend'})});load();}}>Extend</button></td></tr>)}</tbody>
        </table>
      </Card>
    </div>
  );
}
