import { model, models, Schema } from "mongoose";

const settingSchema = new Schema(
  {
    appName: { type: String, default: "Katmitra" },
    supportEmail: { type: String, default: "support@katmitra.com" },
    paymentUpi: { type: String, default: "" },
    paymentBank: { type: String, default: "" },
  },
  { timestamps: true },
);

export const Setting = models.Setting || model("Setting", settingSchema, "settings");
