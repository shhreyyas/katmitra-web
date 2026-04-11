"use client";
import { useEffect, useState } from "react";
import { Card, Input, Button } from "@/components/ui/primitives";

export default function BookingsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState("");
  const load = async () => {
    const p = new URLSearchParams();
    if (date) p.set("date", date);
    if (userId) p.set("userId", userId);
    setRows(await (await fetch(`/api/bookings?${p.toString()}`)).json());
  };
  useEffect(() => { load(); }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Bookings</h1>
      <div className="flex gap-2"><Input type="date" value={date} onChange={(e)=>setDate(e.target.value)} /><Input placeholder="Filter by User ID" value={userId} onChange={(e)=>setUserId(e.target.value)} /><Button onClick={load}>Filter</Button></div>
      <Card className="overflow-auto">
        <table className="text-sm"><thead><tr className="border-b text-left"><th>Event</th><th>Client</th><th>Date</th><th>Location</th><th>Status</th><th>User</th></tr></thead>
          <tbody>{rows.map((r) => <tr key={r._id} className="border-b"><td>{r.eventName}</td><td>{r.clientName}</td><td>{new Date(r.date).toLocaleDateString()}</td><td>{r.location}</td><td>{r.status}</td><td>{r.userId?.businessName ?? r.userId?._id}</td></tr>)}</tbody>
        </table>
      </Card>
    </div>
  );
}
