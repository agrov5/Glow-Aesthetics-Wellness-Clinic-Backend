import {
  createReview,
  getAllReviews,
  getReviewById,
  deleteReview,
} from "../controllers/reviewController";
import { Router } from "express";

const router = Router();

router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.delete("/:id", deleteReview);

export default router;
