"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input } from "@/components/ui/primitives";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@katmitra.com");
  const [password, setPassword] = useState("Admin@123");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      setError("Invalid credentials");
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Katmitra Admin Login</h1>
        <form className="space-y-3" onSubmit={onSubmit}>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
