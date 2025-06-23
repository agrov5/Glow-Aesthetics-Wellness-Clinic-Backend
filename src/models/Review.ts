import { Schema, model } from "mongoose";
import { Listing } from "./Listing";
import { User } from "./User";
import { id } from "./Types";

export interface Review {
  _id?: id;
  review: string;
  rating: 1 | 2 | 3 | 4 | 5;
  user: id;
  listing: id;
  createdAt: Date;
}

const reviewSchema = new Schema({
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ReviewModel = model("Review", reviewSchema);
