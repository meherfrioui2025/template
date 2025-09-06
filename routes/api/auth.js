import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { jwtInfo } from "../../config/keys.js";
import User from "../../models/User.model.js";

const router = express.Router();

const generateToken = (userId) =>
  jwt.sign({ id: userId }, jwtInfo.secret, { expiresIn: jwtInfo.tokenLife });

const handleError = (res, message, status = 400) =>
  res.status(status).json({ error: message });

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return handleError(res, "You must enter an email address.");
    if (!password) return handleError(res, "You must enter a password.");

    const user = await User.findOne({ email });
    console.log(user.password, "user.passwords");
    if (!user) return handleError(res, "No user found for this email address.");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return handleError(res, "Password incorrect.");

    const token = generateToken(user.id);
    res.status(200).json({
      success: true,
      token: `Bearer ${token}`,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    handleError(res, "Your request could not be processed. Please try again.");
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    if (!email) return handleError(res, "You must enter an email address.");
    if (!firstName || !lastName)
      return handleError(res, "You must enter your full name.");
    if (!password) return handleError(res, "You must enter a password.");

    const existingUser = await User.findOne({ email });
    if (existingUser) return handleError(res, "That email is already in use.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    }).save();
    const token = generateToken(newUser.id);

    res.status(201).json({
      success: true,
      token: `Bearer ${token}`,
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (err) {
    handleError(
      res,
      "Your request could not be processed. Please try again.",
      err
    );
  }
});

export default router;
