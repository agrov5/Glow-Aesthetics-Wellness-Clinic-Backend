import mongoose from "mongoose";
import { Request, Response } from "express";
import { Booking, BookingModel } from "../models/Booking";
import { id } from "../models/Types";

export const createBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  const bookingData: Booking = {
    appointmentDetails: req.body.appointmentDetails,
    bookingCreatedAt: new Date(),
    bookingStatus: "pending",
  };

  const booking = new BookingModel(bookingData);

  booking
    .save()
    .then((savedBooking) => {
      res.status(201).json(savedBooking);
    })
    .catch((error) => {
      console.error("Error creating booking:", error);
      res.status(500).json({ message: "Internal server error" });
    });
};
