const ADMIN_TOKEN_KEY = "katmitra_admin_token";

export const adminLogin = (email: string, password: string) => {
  if (email === "admin@katmitra.com" && password === "Admin@123") {
    const token = btoa(`${email}:${Date.now()}`);
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    return true;
  }
  return false;
};

export const isAdminAuthenticated = () => Boolean(localStorage.getItem(ADMIN_TOKEN_KEY));

export const adminLogout = () => localStorage.removeItem(ADMIN_TOKEN_KEY);
