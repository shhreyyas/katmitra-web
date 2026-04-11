import { model, models, Schema } from "mongoose";

const supportTicketSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true },
);

export const SupportTicket =
  models.SupportTicket || model("SupportTicket", supportTicketSchema, "support_tickets");
