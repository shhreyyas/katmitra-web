import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { ensureAdmin } from "@/lib/route-guard";
import { Payment } from "@/models/Payment";
import { ActivityLog } from "@/models/ActivityLog";

export async function GET() {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const data = await Payment.find().populate("userId").sort({ createdAt: -1 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const body = await req.json();
  const created = await Payment.create(body);
  await ActivityLog.create({ type: "payment_log", message: `Payment created: ${created._id}` });
  return NextResponse.json(created, { status: 201 });
}

export async function PATCH(req: Request) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const { id, status } = await req.json();
  const updated = await Payment.findByIdAndUpdate(id, { status }, { new: true });
  await ActivityLog.create({ type: "payment_log", message: `Payment ${id} -> ${status}` });
  return NextResponse.json(updated);
}
