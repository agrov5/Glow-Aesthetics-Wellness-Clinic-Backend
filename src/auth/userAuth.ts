import mongoose from "mongoose";
import { User, UserModel } from "../models/User";
import { id } from "../models/Types";

const bcrypt = require("bcrypt");

// Login user
// const isMatch = await comparePassword(password, hashedPassword);
// console.log("Passwords Match:", isMatch); // Should log true


// Register user

// Logout user

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
  
    try {
      const hash: string = await bcrypt.hash(password, saltRounds);
      return hash;
    } catch (err) {
      console.error("Error hashing password:", err);
      throw err; // Throw the error to handle it in the calling function
    }
  };

// Compare password
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    try {
      const isMatch: boolean = await bcrypt.compare(password, hash);
      return isMatch;
    } catch (err) {
      console.error("Error comparing password:", err);
      throw err; // Throw the error to handle it in the calling function
    }
  };