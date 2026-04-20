import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { ensureAdmin } from "@/lib/route-guard";
import { Quotation } from "@/models/Quotation";

export async function GET() {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const data = await Quotation.find().populate("userId").sort({ date: -1 });
  return NextResponse.json(data);
}
