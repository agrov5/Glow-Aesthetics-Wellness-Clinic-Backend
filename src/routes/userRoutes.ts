import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
} from "../controllers/userController";

import { Router } from "express";

const router = Router();

router.get("/", getAllUsers);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.delete("/:id", deleteUser);

export default router;
