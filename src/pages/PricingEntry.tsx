import { useSearchParams } from "react-router-dom";
import Index from "./Index";
import PricingCheckout from "./PricingCheckout";

/**
 * `/pricing` — marketing landing by default; with `?session_id=` runs app checkout (spec §6).
 */
export default function PricingEntry() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  if (sessionId) {
    return <PricingCheckout />;
  }
  return <Index />;
}
