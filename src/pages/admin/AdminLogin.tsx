import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  ADMIN_IDLE_TIMEOUT_MS,
  ADMIN_SESSION_NOTICE_KEY,
  adminLogin,
  useAdminSession,
} from "@/lib/adminAuth";
import mainLogo from "@/assets/main-logo.jpg";

const readSessionNotice = () => {
  try {
    const reason = sessionStorage.getItem(ADMIN_SESSION_NOTICE_KEY);
    if (reason === "displaced") {
      return "You were signed out because this account signed in on another device.";
    }
    if (reason === "idle") {
      return `You were signed out after ${ADMIN_IDLE_TIMEOUT_MS / 60000} minutes of inactivity.`;
    }
    if (reason === "expired") return "Your session expired. Please sign in again.";
  } catch {
    // ignore
  }
  return "";
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const session = useAdminSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice] = useState(readSessionNotice);
  const [loading, setLoading] = useState(false);

  // Cleared after mount (not in the initializer) so the notice shows once and survives StrictMode's double render.
  useEffect(() => {
    try {
      sessionStorage.removeItem(ADMIN_SESSION_NOTICE_KEY);
    } catch {
      // ignore
    }
  }, []);

  if (session) return <Navigate to="/admin/dashboard" replace />;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    const result = await adminLogin(email, password);
    setLoading(false);
    if (result.ok === true) {
      navigate("/admin/dashboard");
      return;
    }
    setError(result.message);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-dark p-4">
      <div className="flex flex-col items-center gap-3 text-center">
        <img src={mainLogo} alt="" className="h-16 w-16 rounded-xl object-contain" />
        <div>
          <h1 className="font-display text-2xl font-bold">
            <span className="text-gold">KAT</span>MITRA <span className="font-sans text-base font-medium text-muted-foreground">Admin</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in with your admin account.</p>
        </div>
      </div>

      <Card className="glass-card-gold w-full max-w-sm">
        <CardContent className="pt-6">
          <form className="space-y-4" onSubmit={onSubmit}>
            {notice && !error ? (
              <p role="status" className="rounded-md border border-gold/30 bg-gold/10 px-3 py-2 text-sm">
                {notice}
              </p>
            ) : null}
            <div className="space-y-1.5">
              <Label htmlFor="admin-email">Email</Label>
              <Input
                id="admin-email"
                type="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="admin-password">Password</Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-md"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error ? (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to website
      </Link>
    </div>
  );
};

export default AdminLogin;
