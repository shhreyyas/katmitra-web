import { model, models, Schema } from "mongoose";

const adminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpiresAt: { type: Date },
  },
  { timestamps: true },
);

export const AdminUser =
  models.AdminUser || model("AdminUser", adminSchema, "admin_users");
