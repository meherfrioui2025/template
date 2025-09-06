import express from "express";
import User from "../../models/User.model.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

// ✅ Get current user profile
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: "Unable to fetch user profile." });
  }
});

// ✅ Update current user profile
router.put("/me", auth, async (req, res) => {
  try {
    const updates = req.body; // directly send fields like { firstName, lastName }
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user,
    });
  } catch (error) {
    res.status(400).json({ error: "Unable to update profile." });
  }
});

export default router;
