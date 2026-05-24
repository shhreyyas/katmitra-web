const ADMIN_TOKEN_KEY = "katmitra_admin_token";

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

export const getAdminToken = () => localStorage.getItem(ADMIN_TOKEN_KEY);

export const getAdminUser = (): AdminUser | null => {
  const raw = localStorage.getItem(ADMIN_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
};

export const isAdminAuthenticated = () => {
  const token = getAdminToken();
  const user = getAdminUser();
  return Boolean(token && user?.role === "admin");
};

export const adminLogout = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
};

export async function adminLogin(
  email: string,
  password: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const res = await fetch(`${getApiBaseUrl()}/v1/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.trim(),
      password,
      device_type: ADMIN_DEVICE_TYPE,
      fcm_token: null,
    }),
  });

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

  return { ok: true };
}
