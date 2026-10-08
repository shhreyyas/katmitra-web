import { useSyncExternalStore } from "react";

const ADMIN_TOKEN_KEY = "katmitra_admin_token";

// Kept local (not imported from adminApi) to avoid a circular import.
const getApiBaseUrl = () => {
  const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
  return base || "/api";
};
const ADMIN_USER_KEY = "katmitra_admin_user";

/** Web admin sign-in device type (not iOS/Android). */
const ADMIN_DEVICE_TYPE = 3;

export type AdminUser = {
  id: string;
  email: string;
  name?: string;
  role?: string;
};

type SignInResponse = {
  token: string;
  user: { id?: string; email?: string; name?: string; role?: string };
};

export type AdminSession = { token: string; user: AdminUser };

/** Why a session ended without the admin asking — shown once on the login page. */
export type AdminSessionEndReason = "expired" | "displaced" | "idle";

/** Set when a session ends so the login page can explain why the admin was signed out. */
export const ADMIN_SESSION_NOTICE_KEY = "katmitra_admin_session_notice";

/** Sign the admin out after this long without any interaction, in any tab. */
export const ADMIN_IDLE_TIMEOUT_MS = 30 * 60 * 1000;

// In localStorage so every tab shares one idle clock and it survives a reload.
const ADMIN_LAST_ACTIVITY_KEY = "katmitra_admin_last_activity";

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

let cachedRaw: string | null = null;
let cachedSession: AdminSession | null = null;

// Cached on the raw storage values so useSyncExternalStore gets a stable reference.
const readSession = (): AdminSession | null => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  const rawUser = localStorage.getItem(ADMIN_USER_KEY);
  const raw = `${token}\n${rawUser}`;
  if (raw === cachedRaw) return cachedSession;
  cachedRaw = raw;
  cachedSession = null;
  if (token && rawUser) {
    try {
      const user = JSON.parse(rawUser) as AdminUser;
      if (user?.role === "admin") cachedSession = { token, user };
    } catch {
      // corrupt entry — treated as signed out
    }
  }
  return cachedSession;
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

// A sign-in or sign-out in another tab reaches this one through the storage event.
window.addEventListener("storage", (e) => {
  if (e.key === null || e.key === ADMIN_TOKEN_KEY || e.key === ADMIN_USER_KEY) notify();
});

export const getAdminSession = readSession;

/** The signed-in admin, or null. Re-renders when the session starts or ends, in this tab or another. */
export const useAdminSession = () => useSyncExternalStore(subscribe, readSession);

export const getAdminToken = () => readSession()?.token ?? null;

export const getAdminUser = (): AdminUser | null => readSession()?.user ?? null;

export const isAdminAuthenticated = () => readSession() !== null;

export const markAdminActivity = () => {
  localStorage.setItem(ADMIN_LAST_ACTIVITY_KEY, String(Date.now()));
};

/** Ends the session. Pass a reason when the admin did not ask to sign out. */
export const endAdminSession = (reason?: AdminSessionEndReason) => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
  localStorage.removeItem(ADMIN_LAST_ACTIVITY_KEY);
  if (reason) {
    try {
      sessionStorage.setItem(ADMIN_SESSION_NOTICE_KEY, reason);
    } catch {
      // sessionStorage unavailable — the sign-out still happens
    }
  }
  notify();
};

/** Ends the session if the admin has been idle past the timeout. Returns true if it did. */
export const endAdminSessionIfIdle = () => {
  if (!readSession()) return false;
  const last = Number(localStorage.getItem(ADMIN_LAST_ACTIVITY_KEY));
  if (!last) {
    // Session from before the idle clock existed — start it now.
    markAdminActivity();
    return false;
  }
  if (Date.now() - last < ADMIN_IDLE_TIMEOUT_MS) return false;
  endAdminSession("idle");
  return true;
};

// On load, before anything renders: a tab reopened after the timeout must not flash the dashboard.
endAdminSessionIfIdle();

export async function adminLogin(
  email: string,
  password: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  let res: Response;
  try {
    res = await fetch(`${getApiBaseUrl()}/v1/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        password,
        device_type: ADMIN_DEVICE_TYPE,
        fcm_token: null,
      }),
    });
  } catch {
    return { ok: false, message: "Could not reach server" };
  }

  let json: {
    success?: boolean;
    message?: string;
    data?: SignInResponse;
    error?: { message?: string };
  };
  try {
    json = await res.json();
  } catch {
    return { ok: false, message: "Could not reach server" };
  }

  if (!json.success || !json.data?.token) {
    return {
      ok: false,
      message: json.error?.message || json.message || "Invalid credentials",
    };
  }

  const role = json.data.user?.role;
  if (role !== "admin") {
    return { ok: false, message: "This account does not have admin access" };
  }

  localStorage.setItem(ADMIN_TOKEN_KEY, json.data.token);
  localStorage.setItem(
    ADMIN_USER_KEY,
    JSON.stringify({
      id: json.data.user?.id,
      email: json.data.user?.email ?? email,
      name: json.data.user?.name,
      role,
    }),
  );
  markAdminActivity();
  notify();

  return { ok: true };
}
