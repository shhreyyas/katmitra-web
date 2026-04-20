import { model, models, Schema } from "mongoose";

const activityLogSchema = new Schema(
  {
    type: { type: String, required: true },
    message: { type: String, required: true },
    meta: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

export const ActivityLog =
  models.ActivityLog || model("ActivityLog", activityLogSchema, "activity_logs");
