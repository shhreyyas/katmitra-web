import { useEffect } from "react";
import { endAdminSessionIfIdle, markAdminActivity } from "@/lib/adminAuth";

const ACTIVITY_EVENTS = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
const ACTIVITY_WRITE_INTERVAL_MS = 15 * 1000;
const IDLE_CHECK_INTERVAL_MS = 30 * 1000;

/** While `active`, tracks interaction and signs the admin out once they have been idle past the timeout. */
export function useAdminIdleTimeout(active: boolean) {
  useEffect(() => {
    if (!active) return;

    let lastWrite = 0;
    const onActivity = () => {
      const now = Date.now();
      if (now - lastWrite < ACTIVITY_WRITE_INTERVAL_MS) return;
      // The first click after the timeout must sign out, not revive the session.
      if (endAdminSessionIfIdle()) return;
      lastWrite = now;
      markAdminActivity();
    };
    // Background tabs throttle timers, so also check when the tab is looked at again.
    const check = () => {
      endAdminSessionIfIdle();
    };

    ACTIVITY_EVENTS.forEach((name) => window.addEventListener(name, onActivity, { passive: true }));
    document.addEventListener("visibilitychange", check);
    window.addEventListener("focus", check);
    const timer = window.setInterval(check, IDLE_CHECK_INTERVAL_MS);

    return () => {
      ACTIVITY_EVENTS.forEach((name) => window.removeEventListener(name, onActivity));
      document.removeEventListener("visibilitychange", check);
      window.removeEventListener("focus", check);
      window.clearInterval(timer);
    };
  }, [active]);
}
