import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { AdminUser } from "@/models/AdminUser";

export async function POST(req: Request) {
  await connectDb();
  const { email } = await req.json();
  const admin = await AdminUser.findOne({ email });
  if (!admin) return NextResponse.json({ ok: true });

  const token = crypto.randomBytes(24).toString("hex");
  admin.resetToken = token;
  admin.resetTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
  await admin.save();

  return NextResponse.json({
    ok: true,
    // Basic flow: returned for manual testing; replace with email in production.
    resetToken: token,
  });
}
