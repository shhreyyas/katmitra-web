"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/primitives";

export default function PaymentsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const load = async () => setRows(await (await fetch("/api/payments")).json());
  useEffect(() => { load(); }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Payments</h1>
      <Card className="overflow-auto">
        <table className="text-sm"><thead><tr className="border-b text-left"><th>User</th><th>Amount</th><th>Method</th><th>Status</th><th>Txn Id</th><th>Actions</th></tr></thead>
          <tbody>{rows.map((r) => <tr key={r._id} className="border-b"><td>{r.userId?.businessName}</td><td>{r.amount}</td><td>{r.paymentMethod}</td><td>{r.status}</td><td>{r.transactionId || '-'}</td><td><button onClick={async()=>{await fetch('/api/payments',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:r._id,status:'Paid'})});load();}}>Mark Paid</button></td></tr>)}</tbody>
        </table>
      </Card>
    </div>
  );
}
