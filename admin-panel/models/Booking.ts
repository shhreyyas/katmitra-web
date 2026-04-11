import { model, models, Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    eventName: { type: String, required: true },
    clientName: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true },
);

export const Booking = models.Booking || model("Booking", bookingSchema, "bookings");
