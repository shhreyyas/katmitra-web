import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { ensureAdmin } from "@/lib/route-guard";
import { AccessCode } from "@/models/AccessCode";
import { ActivityLog } from "@/models/ActivityLog";

const generateCode = () => String(Math.floor(100000 + Math.random() * 900000));

export async function GET() {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const data = await AccessCode.find().populate("assignedUser").sort({ createdAt: -1 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const { planType, count = 1 } = await req.json();
  const docs = [];
  for (let i = 0; i < count; i += 1) {
    let code = generateCode();
    // Ensure uniqueness.
    while (await AccessCode.findOne({ code })) code = generateCode();
    docs.push({ code, planType });
  }
  const created = await AccessCode.insertMany(docs);
  await ActivityLog.create({
    type: "code_usage",
    message: `Generated ${created.length} access code(s)`,
  });
  return NextResponse.json(created, { status: 201 });
}

export async function PATCH(req: Request) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const { id, status } = await req.json();
  const updated = await AccessCode.findByIdAndUpdate(id, { status }, { new: true });
  return NextResponse.json(updated);
}
