import bcrypt from "bcryptjs";
import { connectDb } from "@/lib/db";
import { AdminUser } from "@/models/AdminUser";
import { User } from "@/models/User";
import { Subscription } from "@/models/Subscription";
import { Payment } from "@/models/Payment";
import { Booking } from "@/models/Booking";
import { Quotation } from "@/models/Quotation";
import { SupportTicket } from "@/models/SupportTicket";
import { Setting } from "@/models/Setting";

async function run() {
  await connectDb();
  const email = process.env.ADMIN_EMAIL || "admin@katmitra.com";
  const password = process.env.ADMIN_PASSWORD || "Admin@123";

  const existing = await AdminUser.findOne({ email });
  if (!existing) {
    await AdminUser.create({
      email,
      passwordHash: await bcrypt.hash(password, 10),
    });
  }

  const users = await User.find();
  if (users.length === 0) {
    const now = new Date();
    const sampleUsers = await User.insertMany([
      {
        businessName: "Royal Caterers",
        ownerName: "Ravi Shah",
        phone: "9876543210",
        email: "royal@example.com",
        planType: "12M",
        expiryDate: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
        status: "active",
      },
      {
        businessName: "Spice Events",
        ownerName: "Meera Patel",
        phone: "9988776655",
        email: "spice@example.com",
        planType: "1M",
        expiryDate: new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()),
        status: "expired",
      },
    ]);

    await Subscription.create({
      userId: sampleUsers[0]._id,
      planType: "12M",
      startDate: now,
      endDate: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
      status: "active",
    });
    await Payment.create({
      userId: sampleUsers[0]._id,
      amount: 12000,
      paymentMethod: "UPI",
      status: "Paid",
      transactionId: "TXN123456",
    });
    await Booking.create({
      userId: sampleUsers[0]._id,
      eventName: "Wedding Feast",
      clientName: "Ankit",
      date: new Date(),
      location: "Ahmedabad",
      status: "Confirmed",
    });
    await Quotation.create({
      userId: sampleUsers[0]._id,
      title: "Corporate Lunch Package",
      amount: 45000,
      status: "Sent",
      date: new Date(),
    });
    await SupportTicket.create({
      userId: sampleUsers[0]._id,
      message: "Need help with menu templates.",
      status: "open",
    });
  }

  await Setting.findOneAndUpdate(
    {},
    {
      appName: "Katmitra",
      supportEmail: "support@katmitra.com",
      paymentUpi: "katmitra@upi",
      paymentBank: "Katmitra Pvt Ltd - ICICI - XXXX1234",
    },
    { upsert: true },
  );
  console.log("Seed completed");
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
