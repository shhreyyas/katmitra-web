import { model, models, Schema } from "mongoose";

const notificationLogSchema = new Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    sentTo: { type: String, default: "all-users" },
    sentCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const NotificationLog =
  models.NotificationLog ||
  model("NotificationLog", notificationLogSchema, "notification_logs");
