import { Mongoose, Types } from "mongoose";
import { User, UserModel } from "../models/User";
import { Listing, ListingModel } from "../models/Listing";
import { Review, ReviewModel } from "../models/Review";
import { id } from "../models/Types";
import { hashPassword } from "../auth/userAuth";

// Create user
export const createUser = async (req: any, res: any) => {
  const { name, username, email, password } = req.body;

  const hashed = await hashPassword(password);

  const newUser: User = {
    _id: new Types.ObjectId(),
    name,
    username,
    email,
    password: hashed,
    bookings: [],
    properties: [],
    reviews: [],
    userCreatedAt: new Date(),
  };

  UserModel.create(newUser)
    .then(() => {
      res.status(201).json({ created: true, id: newUser._id });
    })
    .catch((error: any) => {
      res
        .status(500)
        .json({ error: "Error creating user", error_message: error });
    });
};

// Get all users
export const getAllUsers = (req: any, res: any) => {
  UserModel.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error: any) => {
      res.status(500).json({ error: "Error fetching users" });
    });
};

// Get user by ID
export const getUserById = (req: any, res: any) => {
  const userId: id = req.params.id;
  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((error: any) => {
      res.status(500).json({ error: "Error fetching user" });
    });
};

// Delete user
export const deleteUser = (req: any, res: any) => {
  const userId: id = req.params.id;
  UserModel.findByIdAndDelete(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    })
    .catch((error: any) => {
      res.status(500).json({ error: "Error deleting user" });
    });
};

