import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

/** Public https API (include `/api`). In production, VITE_API_BASE_URL must be set at build time (e.g. Vercel env). */
const API_BASE = (() => {
  const v = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
  if (v) return v;
  if (import.meta.env.DEV) return "http://localhost:3000/api";
  return "";
})();

type PlanRow = {
  plan_type: string;
  amount_paise: number;
  period: string;
  interval: number;
};

type ValidatePayload = {
  valid: boolean;
  key_id: string | null;
  business_name: string | null;
  prefill?: { email?: string | null; name?: string | null; contact?: string | null };
  plans: PlanRow[];
};

declare global {
  interface Window {
    Razorpay?: new (opts: Record<string, unknown>) => { open: () => void };
  }
}

function formatInrPaise(paise: number) {
  const rupees = paise / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}

function planLabel(code: string) {
  if (code === "monthly") return "Monthly";
  if (code === "six_months") return "6 months";
  if (code === "yearly") return "Yearly";
  return code;
}

export default function PricingCheckout() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id") || "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validated, setValidated] = useState<ValidatePayload | null>(null);
  const [busyPlan, setBusyPlan] = useState<string | null>(null);

  const loadScript = useCallback(() => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Failed to load Razorpay"));
      document.body.appendChild(s);
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!sessionId) {
        setError("Missing session_id in URL.");
        setLoading(false);
        return;
      }
      if (!API_BASE) {
        setError(
          "Checkout is not configured: set VITE_API_BASE_URL (your public API URL ending in /api) in the web app build environment, then redeploy.",
        );
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `${API_BASE}/billing/session/validate?session_id=${encodeURIComponent(sessionId)}`,
        );
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json?.error?.message || json?.message || "Validation failed");
        }
        if (!cancelled) {
          setValidated(json.data as ValidatePayload);
        }
      } catch (e) {
        if (!cancelled) {
          const raw = e instanceof Error ? e.message : "Could not validate session";
          const isNetwork = /load failed|failed to fetch|networkerror/i.test(raw);
          setError(
            isNetwork
              ? "Could not reach the API. On the live site, VITE_API_BASE_URL must be your deployed backend (https://…/api), rebuilt after setting it in Vercel (or your host). Mixed http://localhost from an https page will always fail."
              : raw,
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const features = useMemo(
    () => [
      "Unlimited bookings & quotations",
      "Menu & pricing management",
      "Priority support",
      "Auto-renewal (cancel anytime per Razorpay rules)",
    ],
    [],
  );

  const startCheckout = async (planType: string) => {
    if (!sessionId || !validated?.key_id) return;
    setBusyPlan(planType);
    setError(null);
    try {
      await loadScript();
      const res = await fetch(`${API_BASE}/billing/create-subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, plan_type: planType }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json?.error?.message || json?.message || "Could not start subscription");
      }
      const subId = json.data?.subscription_id as string;
      const key = json.data?.key_id as string;
      if (!subId || !key || !window.Razorpay) {
        throw new Error("Checkout unavailable");
      }

      const pre = validated.prefill || {};
      const rzp = new window.Razorpay({
        key,
        subscription_id: subId,
        name: "Katmitra",
        description: `Subscription — ${planLabel(planType)}`,
        prefill: {
          email: pre.email || undefined,
          name: pre.name || undefined,
          contact: pre.contact || undefined,
        },
        theme: { color: "#0f172a" },
        handler() {
          window.location.href = "/?paid=1";
        },
      });
      rzp.open();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Payment start failed");
    } finally {
      setBusyPlan(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error && !validated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 bg-background">
        <p className="text-center text-destructive max-w-md">{error}</p>
        <Button variant="outline" onClick={() => window.location.assign("/")}>
          Back to pricing
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <div className="max-w-lg mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Upgrade Katmitra</h1>
          {validated?.business_name ? (
            <p className="text-muted-foreground mt-1">{validated.business_name}</p>
          ) : null}
          <p className="text-sm text-muted-foreground mt-2">
            Complete payment in the secure Razorpay window. Your app unlocks after the server
            confirms the subscription (webhook).
          </p>
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Included</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {(validated?.plans || []).map((p) => (
            <Card key={p.plan_type}>
              <CardContent className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="font-medium">{planLabel(p.plan_type)}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatInrPaise(p.amount_paise)} / cycle
                  </p>
                </div>
                <Button
                  onClick={() => startCheckout(p.plan_type)}
                  disabled={busyPlan !== null}
                >
                  {busyPlan === p.plan_type ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Pay now"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
