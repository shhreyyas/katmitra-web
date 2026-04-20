"use client";
import { useEffect, useState } from "react";
import { Button, Card, Input } from "@/components/ui/primitives";

export default function NotificationsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [rows, setRows] = useState<any[]>([]);
  const load = async () => setRows(await (await fetch("/api/notifications")).json());
  useEffect(() => { load(); }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <Card className="space-y-2">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />
        <Button onClick={async()=>{await fetch('/api/notifications',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,message})});setTitle('');setMessage('');load();}}>Send to All Users</Button>
      </Card>
      <Card><ul className="space-y-2 text-sm">{rows.map((r) => <li key={r._id}>{r.title} - {r.sentCount} users - {new Date(r.createdAt).toLocaleString()}</li>)}</ul></Card>
    </div>
  );
}
