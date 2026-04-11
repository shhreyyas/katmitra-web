import { model, models, Schema, Types } from "mongoose";
import type { PlanType, UserStatus } from "@/types";

const userSchema = new Schema(
  {
    businessName: { type: String, required: true },
    ownerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    planType: { type: String, enum: ["1M", "6M", "12M"], required: true },
    expiryDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["active", "expired", "suspended", "deleted"],
      default: "active",
    },
    fullBusinessInfo: { type: String, default: "" },
    lastLoginAt: { type: Date },
    subscriptionHistory: [
      {
        planType: { type: String, enum: ["1M", "6M", "12M"], required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true },
);

export type UserDoc = {
  _id: Types.ObjectId;
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  planType: PlanType;
  expiryDate: Date;
  status: UserStatus;
};

export const User = models.User || model("User", userSchema, "users");
