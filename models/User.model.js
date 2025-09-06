// models/User.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },

    // 🔑 Add password field
    password: { 
      type: String, 
      required: true, 
      minlength: 6 // enforce a minimum length
    },

    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  {
    timestamps: { createdAt: "created", updatedAt: "updated" },
  }
);

export default model("User", userSchema);
