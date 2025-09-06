import { config } from "dotenv";
config(); // Load .env file

import mongoose from "mongoose";

import { database } from "../config/keys.js";

const setupDB = async () => {
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};

export default setupDB;
