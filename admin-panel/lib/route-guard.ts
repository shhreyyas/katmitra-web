import { getAuthPayload, unauthorized } from "@/lib/auth";

export const ensureAdmin = async () => {
  const payload = await getAuthPayload();
  if (!payload) return { ok: false as const, response: unauthorized() };
  return { ok: true as const, payload };
};
