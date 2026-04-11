import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { AUTH_COOKIE } from "@/lib/auth";
import { signToken } from "@/lib/jwt";
import { AdminUser } from "@/models/AdminUser";
import { ActivityLog } from "@/models/ActivityLog";

export async function POST(req: Request) {
  await connectDb();
  const { email, password } = await req.json();

  const admin = await AdminUser.findOne({ email });
  if (!admin) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ adminId: String(admin._id), email: admin.email });
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, token, { httpOnly: true, secure: true, path: "/" });

  await ActivityLog.create({ type: "admin_login", message: `Admin login: ${email}` });
  return NextResponse.json({ ok: true });
}
