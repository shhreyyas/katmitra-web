import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { ensureAdmin } from "@/lib/route-guard";
import { Booking } from "@/models/Booking";

export async function GET(req: Request) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const date = searchParams.get("date");
  const where: Record<string, unknown> = {};
  if (userId) where.userId = userId;
  if (date) {
    const start = new Date(date);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    where.date = { $gte: start, $lt: end };
  }
  const data = await Booking.find(where).populate("userId").sort({ date: -1 });
  return NextResponse.json(data);
}
