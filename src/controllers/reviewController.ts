import mongoose from "mongoose";
import { User, UserModel } from "../models/User";
import { Listing, ListingModel } from "../models/Listing";
import { Review, ReviewModel } from "../models/Review";
import { id } from "../models/Types";

// Create review
export const createReview = (req: any, res: any) => {
  const { review, rating, userId, listingId } = req.body;
  const newReview: Review = {
    _id: new mongoose.Types.ObjectId(),
    review,
    rating,
    user: userId,
    listing: listingId,
    createdAt: new Date(),
  };

  ReviewModel.create(newReview)
    .then(() => {
      res.status(201).json({ created: true, id: newReview._id });
    })
    .catch((error: any) => {
      return res
        .status(500)
        .json({ error: "Error creating review", error_message: error });
    });

  UserModel.findById(userId).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.reviews.push(newReview._id as mongoose.Types.ObjectId);
    user.save().catch((error: any) => {
      return res
        .status(500)
        .json({ error: "Error saving user", error_message: error });
    });
  });

  ListingModel.findById(listingId).then((listing) => {
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    listing.reviews.push(newReview._id as mongoose.Types.ObjectId);
    listing.save().catch((error: any) => {
      return res
        .status(500)
        .json({ error: "Error saving listing", error_message: error });
    });
  });
};

// Get all reviews
export const getAllReviews = (req: any, res: any) => {
  ReviewModel.find()
    .then((reviews) => {
      res.status(200).json(reviews);
    })
    .catch((error: any) => {
      return res
        .status(500)
        .json({ error: "Error fetching reviews", error_message: error });
    });
};

// Get review by ID
export const getReviewById = (req: any, res: any) => {
  const reviewId: id = req.params.id;
  ReviewModel.findById(reviewId)
    .then((review) => {
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }
      res.status(200).json(review);
    })
    .catch((error: any) => {
      return res
        .status(500)
        .json({ error: "Error fetching review", error_message: error });
    });
};

// Delete review
export const deleteReview = (req: any, res: any) => {
  const reviewId: id = req.params.id;
  ReviewModel.findByIdAndDelete(reviewId)
    .then((review) => {
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }

      UserModel.findById(review.user).then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        user.reviews.splice(
          user.reviews.indexOf(reviewId as mongoose.Types.ObjectId)
        );

        user.save().catch((error: any) => {
          return res
            .status(500)
            .json({ error: "Error saving user", error_message: error });
        });
      });

      ListingModel.findById(review.listing).then((listing) => {
        if (!listing) {
          return res.status(404).json({ error: "Listing not found" });
        }

        listing.reviews.splice(
          listing.reviews.indexOf(reviewId as mongoose.Types.ObjectId)
        );

        listing.save().catch((error: any) => {
          return res
            .status(500)
            .json({ error: "Error saving listing", error_message: error });
        });
      });
    })
    .catch((error: any) => {
      return res
        .status(500)
        .json({ error: "Error deleting review", error_message: error });
    });

  res.status(200).json({ message: "Review deleted successfully" });
};
