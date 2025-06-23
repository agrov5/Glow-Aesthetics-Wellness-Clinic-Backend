import { Router } from "express";
import {
  createListing,
  getAllListings,
  getListingById,
  deleteListing,
} from "../controllers/listingController";

const router = Router();

router.post("/", createListing);
router.get("/", getAllListings);
router.get("/:id", getListingById);
router.delete("/:id", deleteListing);
// router.delete("/:id", deleteItem);

export default router;
