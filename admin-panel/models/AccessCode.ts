import { model, models, Schema } from "mongoose";

const accessCodeSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    planType: { type: String, enum: ["1M", "6M", "12M"], required: true },
    status: {
      type: String,
      enum: ["unused", "used", "expired", "disabled"],
      default: "unused",
    },
    assignedUser: { type: Schema.Types.ObjectId, ref: "User" },
    usedAt: { type: Date },
  },
  { timestamps: true },
);

export const AccessCode =
  models.AccessCode || model("AccessCode", accessCodeSchema, "access_codes");
