import express from "express";
import { signIn, signOut, signUp, resetPassword } from "../controllers/auth.js";

const router = express.Router();

// auth routes
router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.post("/sign-out", signOut);
router.post("/reset-password", resetPassword);

export default router;
