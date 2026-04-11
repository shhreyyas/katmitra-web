import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { ensureAdmin } from "@/lib/route-guard";
import { User } from "@/models/User";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const { id } = await params;
  const user = await User.findById(id);
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
  return NextResponse.json(user);
}

export async function PATCH(req: Request, { params }: Params) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const { id } = await params;
  const updates = await req.json();
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  return NextResponse.json(user);
}

export async function DELETE(_: Request, { params }: Params) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const { id } = await params;
  await User.findByIdAndUpdate(id, { status: "deleted" });
  return NextResponse.json({ ok: true });
}
