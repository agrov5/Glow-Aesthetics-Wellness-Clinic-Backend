import mongoose from "mongoose";
import { User, UserModel } from "../models/User";
import { Booking, BookingModel } from "../models/Booking";
import { Listing, ListingModel } from "../models/Listing";
import { id } from "../models/Types";

// Create listing
export const createBooking = (req: any, res: any) => {
  const { listingId, userId, bookingDate } = req.body;

  // Validate input
  if (!listingId || !userId || !bookingDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Create new booking
  const newBooking: Booking = new BookingModel({
    _id: new mongoose.Types.ObjectId(),
    listingId,
    userId,
    bookingDate,
  });

  // Add the booking to user
  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.bookings.push(newBooking._id as mongoose.Types.ObjectId);
      return user.save();
    })
    .catch((error: any) => {
      return res
        .status(500)
        .json({ error: "Error saving user", error_message: error });
    });

  BookingModel.create(newBooking)
    .then(() => {
      res.status(201).json({ created: true, id: newBooking._id });
    })
    .catch((error: any) => {
      res
        .status(500)
        .json({ error: "Error creating booking", error_message: error });
    });
};

// Get all bookings
export const getAllBookings = (req: any, res: any) => {
  BookingModel.find()
    .then((bookings) => {
      res.status(200).json(bookings);
    })
    .catch((error: any) => {
      res
        .status(500)
        .json({ error: "Error fetching bookings", error_message: error });
    });
};

// Get booking by ID
export const getBookingById = (req: any, res: any) => {
  const bookingId: id = req.params.id;
  BookingModel.findById(bookingId)
    .then((booking) => {
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.status(200).json(booking);
    })
    .catch((error: any) => {
      res
        .status(500)
        .json({ error: "Error fetching booking", error_message: error });
    });
};

// Delete booking
export const deleteBooking = (req: any, res: any) => {
  const bookingId: id = req.params.id;
  BookingModel.findByIdAndDelete(bookingId)
    .then((booking) => {
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      UserModel.findById(booking.userId).then((user) => {
        if (!user) {
          return res.status(404).json({ error: " not found" });
        }

        user.bookings.splice(
          user.bookings.indexOf(bookingId as mongoose.Types.ObjectId)
        );

        user.save().catch((error: any) => {
          res
            .status(500)
            .json({ error: "Error saving user", error_message: error });
        });
      });

      res.status(200).json({ message: "Booking deleted successfully" });
    })
    .catch((error: any) => {
      res
        .status(500)
        .json({ error: "Error deleting booking", error_message: error });
    });
};

// Update booking status
export const updateBookingStatus = (req: any, res: any) => {
  const bookingId: id = req.params.id;
  const { status } = req.body;

  BookingModel.findByIdAndUpdate(bookingId).then((booking) => {
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    booking.bookingStatus = status;

    booking
      .save()
      .then(() => {
        res
          .status(200)
          .json({ message: "Booking status updated successfully" });
      })
      .catch((error: any) => {
        res
          .status(500)
          .json({
            error: "Error updating booking status",
            error_message: error,
          });
      });
  });
};
