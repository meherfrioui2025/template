import express from "express";

import AuthRoutes from "./auth.js";
import userRoutes from "./user.js";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/user", userRoutes);

export default router;
