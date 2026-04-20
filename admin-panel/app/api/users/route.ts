import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { ensureAdmin } from "@/lib/route-guard";
import { User } from "@/models/User";

export async function GET(req: Request) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;

  await connectDb();
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const filter = query
    ? {
        $or: [
          { businessName: { $regex: query, $options: "i" } },
          { ownerName: { $regex: query, $options: "i" } },
          { phone: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find({ ...filter, status: { $ne: "deleted" } }).sort({
    createdAt: -1,
  });
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();
  const body = await req.json();
  const user = await User.create(body);
  return NextResponse.json(user, { status: 201 });
}
