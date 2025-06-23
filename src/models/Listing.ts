import { Schema, model } from "mongoose";
import { Review } from "./Review";
import { id } from "./Types";

// TODO: Make schema for Listing interface

// export const ListingModel = mongoose.model("Listing", listingSchema);

export interface Listing {
  _id?: id;
  name: string;
  userId: id;
  description: string;
  price: number;
  location: string;
  createdAt: Date;
  images: string[];
  reviews?: id[];
}

const listingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  images: [
    {
      type: String,
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

export const ListingModel = model("Listing", listingSchema);
