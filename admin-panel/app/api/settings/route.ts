import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { ensureAdmin } from "@/lib/route-guard";
import { Setting } from "@/models/Setting";

export async function GET() {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  let settings = await Setting.findOne();
  if (!settings) settings = await Setting.create({});
  return NextResponse.json(settings);
}

export async function PATCH(req: Request) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const body = await req.json();
  const updated = await Setting.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
  });
  return NextResponse.json(updated);
}
