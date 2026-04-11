"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/primitives";

export default function UserDetailsPage() {
  const params = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/users/${params.id}`)
      .then((r) => r.json())
      .then(setUser);
  }, [params.id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">User Details</h1>
      <Card>
        <p><b>Business:</b> {user.businessName}</p>
        <p><b>Owner:</b> {user.ownerName}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>
        <p><b>Last Login:</b> {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "-"}</p>
        <p><b>Full Business Info:</b> {user.fullBusinessInfo || "-"}</p>
      </Card>
      <Card>
        <h2 className="mb-2 font-semibold">Subscription History</h2>
        <ul className="list-disc pl-5">
          {(user.subscriptionHistory ?? []).map((s: any, i: number) => (
            <li key={i}>{s.planType} ({new Date(s.startDate).toLocaleDateString()} - {new Date(s.endDate).toLocaleDateString()})</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
