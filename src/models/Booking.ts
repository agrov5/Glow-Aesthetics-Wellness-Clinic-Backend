import { Schema, model } from "mongoose";
import { id } from "./Types";

// export const ListingModel = mongoose.model("Listing", listingSchema);

export interface Booking {
  _id?: id;
  listingId: id;
  userId: id;
  bookingDate: Date;
  bookingCreatedAt: Date;
  bookingStatus: "pending" | "confirmed" | "cancelled";
}

const bookingSchema = new Schema({
  listingId: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  bookingCreatedAt: {
    type: Date,
    default: Date.now,
  },
  bookingStatus: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
});

export const BookingModel = model("Booking", bookingSchema);
