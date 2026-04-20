import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { ensureAdmin } from "@/lib/route-guard";
import { SupportTicket } from "@/models/SupportTicket";

export async function GET() {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const data = await SupportTicket.find().populate("userId").sort({ createdAt: -1 });
  return NextResponse.json(data);
}

export async function PATCH(req: Request) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const { id, status } = await req.json();
  const updated = await SupportTicket.findByIdAndUpdate(id, { status }, { new: true });
  return NextResponse.json(updated);
}
