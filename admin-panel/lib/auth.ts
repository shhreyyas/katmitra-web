import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export const AUTH_COOKIE = "katmitra_admin_token";

export const getAuthPayload = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
};

export const unauthorized = () =>
  NextResponse.json({ message: "Unauthorized" }, { status: 401 });
