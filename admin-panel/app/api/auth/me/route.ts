import { NextResponse } from "next/server";
import { getAuthPayload, unauthorized } from "@/lib/auth";

export async function GET() {
  const payload = await getAuthPayload();
  if (!payload) return unauthorized();
  return NextResponse.json({ admin: payload });
}
