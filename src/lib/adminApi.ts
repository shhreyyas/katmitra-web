import { endAdminSession, getAdminToken } from "@/lib/adminAuth";

const SESSION_ENDED_CODES = new Set(["SESSION_DISPLACED", "UNAUTHORIZED"]);

// Clearing the session is enough: AdminProtectedRoute sees it end and redirects to the login page.
const handleSessionEnded = (code?: string) => {
  endAdminSession(code === "SESSION_DISPLACED" ? "displaced" : "expired");
};

export const getApiBaseUrl = () => {
  const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
  return base || "/api";
};

type ApiEnvelope<T> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: { code?: string; message?: string };
};

export class AdminApiError extends Error {
  code?: string;
  status: number;

  constructor(message: string, status = 400, code?: string) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
    this.code = code;
  }
}

export async function adminFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = getAdminToken();
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("X-Language", "en");
  headers.set("ngrok-skip-browser-warning", "true");

  let res: Response;
  try {
    res = await fetch(`${getApiBaseUrl()}${path}`, { ...init, headers });
  } catch {
    throw new AdminApiError("Could not reach the server. Check your connection.", 0, "NETWORK");
  }
  let json: ApiEnvelope<T> | null = null;
  try {
    json = await res.json();
  } catch {
    if (res.status === 401) handleSessionEnded();
    throw new AdminApiError("Invalid server response", res.status);
  }

  if (res.status === 401 || SESSION_ENDED_CODES.has(json?.error?.code ?? "")) {
    handleSessionEnded(json?.error?.code);
    throw new AdminApiError(
      "Your session has ended. Please sign in again.",
      401,
      json?.error?.code,
    );
  }

  if (!res.ok || !json?.success) {
    const msg =
      json?.error?.message || json?.message || "Request failed";
    throw new AdminApiError(msg, res.status, json?.error?.code);
  }

  return json.data as T;
}
