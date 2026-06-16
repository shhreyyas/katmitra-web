import { getAdminToken } from "@/lib/adminAuth";

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

  const res = await fetch(`${getApiBaseUrl()}${path}`, { ...init, headers });
  let json: ApiEnvelope<T> | null = null;
  try {
    json = await res.json();
  } catch {
    throw new AdminApiError("Invalid server response", res.status);
  }

  if (!res.ok || !json?.success) {
    const msg =
      json?.error?.message || json?.message || "Request failed";
    throw new AdminApiError(msg, res.status, json?.error?.code);
  }

  return json.data as T;
}
