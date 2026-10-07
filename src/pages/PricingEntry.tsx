import { useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Index from "./Index";
import PricingCheckout from "./PricingCheckout";

/** Shown after Razorpay hands control back (`/?paid=1`). The app unlocks once the webhook is processed. */
const PaymentReceived = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-center text-foreground">
    <CheckCircle2 className="h-14 w-14 text-gold" aria-hidden />
    <h1 className="font-display text-2xl font-semibold">Payment received</h1>
    <p className="max-w-md text-muted-foreground">
      Thank you! Return to the Katmitra app — your subscription activates as soon as the payment
      is confirmed, usually within a minute.
    </p>
    <Button variant="outline" onClick={() => window.location.assign("/")}>
      Go to Katmitra home
    </Button>
  </div>
);

/**
 * `/pricing` — marketing landing by default; with `?session_id=` runs app checkout (spec §6).
 */
export default function PricingEntry() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  if (sessionId) {
    return <PricingCheckout />;
  }
  if (searchParams.get("paid") === "1") {
    return <PaymentReceived />;
  }
  return <Index />;
}
