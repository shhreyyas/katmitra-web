"use client";
import { useEffect, useState } from "react";
import { Button, Card, Input } from "@/components/ui/primitives";

export default function SettingsPage() {
  const [data, setData] = useState<any>({});
  useEffect(() => { fetch("/api/settings").then((r) => r.json()).then(setData); }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Card className="space-y-2">
        <Input placeholder="App Name" value={data.appName ?? ""} onChange={(e)=>setData({...data,appName:e.target.value})} />
        <Input placeholder="Support Email" value={data.supportEmail ?? ""} onChange={(e)=>setData({...data,supportEmail:e.target.value})} />
        <Input placeholder="UPI ID" value={data.paymentUpi ?? ""} onChange={(e)=>setData({...data,paymentUpi:e.target.value})} />
        <Input placeholder="Bank Details" value={data.paymentBank ?? ""} onChange={(e)=>setData({...data,paymentBank:e.target.value})} />
        <Button onClick={async()=>{const res=await fetch('/api/settings',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});setData(await res.json());}}>Save Settings</Button>
      </Card>
    </div>
  );
}
