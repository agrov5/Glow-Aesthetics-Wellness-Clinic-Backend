import { Router } from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
  updateBookingStatus
} from "../controllers/bookingController";

const router = Router();

router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.patch("/:id", updateBookingStatus);
router.delete("/:id", deleteBooking);
// router.delete("/:id", deleteItem);

export default router;
