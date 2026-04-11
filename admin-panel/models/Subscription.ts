import { model, models, Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    planType: { type: String, enum: ["1M", "6M", "12M"], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["active", "expired", "pending"],
      default: "active",
    },
  },
  { timestamps: true },
);

export const Subscription =
  models.Subscription || model("Subscription", subscriptionSchema, "subscriptions");
