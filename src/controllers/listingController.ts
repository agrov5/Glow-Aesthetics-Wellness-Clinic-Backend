import mongoose from "mongoose";
import { User, UserModel } from "../models/User";
import { Review, ReviewModel } from "../models/Review";
import { Listing, ListingModel } from "../models/Listing";
import { id } from "../models/Types";

// Create listing
export const createListing = (req: any, res: any) => {
  const { name, userId, description, price, location, images } = req.body;
  const newListing: Listing = {
    _id: new mongoose.Types.ObjectId(),
    name,
    userId: userId as id,
    description,
    price,
    location,
    createdAt: new Date(),
    images,
  };

  ListingModel.create(newListing)
    .then(() => {
      res.status(201).json({ created: true, id: newListing._id });

      // Update user with new listing
      UserModel.findById(userId).then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        user.properties.push(newListing._id as mongoose.Types.ObjectId);
        user.save().catch((error: any) => {
          res
            .status(500)
            .json({ error: "Error saving user", error_message: error });
        });
      });
    })
    .catch((error: any) => {
      res
        .status(500)
        .json({ error: "Error creating listing", error_message: error });
    });
};

// Get all listings
export const getAllListings = (req: any, res: any) => {
  ListingModel.find()
    .then((listings) => {
      res.status(200).json(listings);
    })
    .catch((error: any) => {
      res
        .status(500)
        .json({ error: "Error fetching listings", error_message: error });
    });
};

// Get listing by ID
export const getListingById = (req: any, res: any) => {
  const listingId: id = req.params.id;
  ListingModel.findById(listingId)
    .then((listing) => {
      if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
      }
      res.status(200).json(listing);
    })
    .catch((error: any) => {
      res
        .status(500)
        .json({ error: "Error fetching listing", error_message: error });
    });
};

// Delete listing
export const deleteListing = (req: any, res: any) => {
  const listingId: id = req.params.id;
  ListingModel.findByIdAndDelete(listingId)
    .then((listing) => {
      if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
      }

      // Remove listing from user
      UserModel.findById(listing.userId).then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        user.properties = user.properties.filter(
          (property: id) => property.toString() !== listingId.toString()
        );
        user.save().catch((error: any) => {
          res
            .status(500)
            .json({ error: "Error saving user", error_message: error });
        });
      });

      res.status(200).json({ message: "Listing deleted successfully" });
    })
    .catch((error: any) => {
      res
        .status(500)
        .json({ error: "Error deleting listing", error_message: error });
    });
};
