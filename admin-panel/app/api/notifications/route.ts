import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { ensureAdmin } from "@/lib/route-guard";
import { NotificationLog } from "@/models/NotificationLog";
import { User } from "@/models/User";

export async function GET() {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const data = await NotificationLog.find().sort({ createdAt: -1 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const { title, message } = await req.json();
  const sentCount = await User.countDocuments({ status: { $ne: "deleted" } });
  const created = await NotificationLog.create({ title, message, sentCount });
  return NextResponse.json(created, { status: 201 });
}
