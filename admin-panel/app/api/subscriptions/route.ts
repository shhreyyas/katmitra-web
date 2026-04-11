import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { ensureAdmin } from "@/lib/route-guard";
import { Subscription } from "@/models/Subscription";
import { planToMonths } from "@/lib/utils";
import { User } from "@/models/User";

export async function GET() {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const data = await Subscription.find().populate("userId").sort({ createdAt: -1 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const body = await req.json();
  const created = await Subscription.create(body);
  return NextResponse.json(created, { status: 201 });
}

export async function PATCH(req: Request) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const { id, action } = await req.json();
  const sub = await Subscription.findById(id);
  if (!sub) return NextResponse.json({ message: "Not found" }, { status: 404 });
  if (action === "activate") sub.status = "active";
  if (action === "extend") {
    const months = planToMonths(sub.planType);
    const end = new Date(sub.endDate);
    end.setMonth(end.getMonth() + months);
    sub.endDate = end;
    await User.findByIdAndUpdate(sub.userId, { expiryDate: end, status: "active" });
  }
  await sub.save();
  return NextResponse.json(sub);
}
