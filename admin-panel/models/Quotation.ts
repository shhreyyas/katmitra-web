import { model, models, Schema } from "mongoose";

const quotationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["Draft", "Sent", "Accepted"], required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);

export const Quotation =
  models.Quotation || model("Quotation", quotationSchema, "quotations");
