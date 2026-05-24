import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { adminLogin, isAdminAuthenticated } from "@/lib/adminAuth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAdminAuthenticated()) return <Navigate to="/admin/dashboard" replace />;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await adminLogin(email, password);
    setLoading(false);
    if (result.ok) {
      navigate("/admin/dashboard");
      return;
    }
    setError(result.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-dark p-4">
      <Card className="glass-card-gold w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-gradient-gold">Katmitra Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={onSubmit}>
            <Input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin email"
              required
            />
            <Input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
