import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { ensureAdmin } from "@/lib/route-guard";
import { User } from "@/models/User";
import { Subscription } from "@/models/Subscription";
import { Payment } from "@/models/Payment";
import { Booking } from "@/models/Booking";
import { Quotation } from "@/models/Quotation";

export async function GET() {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;
  await connectDb();

  const [totalUsers, activeSubscriptions, expiredUsers, revenueAgg, totalBookings, totalQuotations] =
    await Promise.all([
      User.countDocuments({ status: { $ne: "deleted" } }),
      Subscription.countDocuments({ status: "active" }),
      User.countDocuments({ status: "expired" }),
      Payment.aggregate([
        { $match: { status: "Paid" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Booking.countDocuments(),
      Quotation.countDocuments(),
    ]);

  const monthlyRevenue = await Payment.aggregate([
    { $match: { status: "Paid" } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        value: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, month: "$_id", value: 1 } },
  ]);

  const userGrowth = await User.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        value: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, month: "$_id", value: 1 } },
  ]);

  return NextResponse.json({
    totals: {
      totalUsers,
      activeSubscriptions,
      expiredUsers,
      totalRevenue: revenueAgg?.[0]?.total ?? 0,
      totalBookings,
      totalQuotations,
    },
    monthlyRevenue,
    userGrowth,
  });
}
