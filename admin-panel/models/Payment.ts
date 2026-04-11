import { model, models, Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["UPI", "Cash", "Bank"], required: true },
    status: { type: String, enum: ["Paid", "Pending"], default: "Pending" },
    transactionId: { type: String },
  },
  { timestamps: true },
);

export const Payment = models.Payment || model("Payment", paymentSchema, "payments");
