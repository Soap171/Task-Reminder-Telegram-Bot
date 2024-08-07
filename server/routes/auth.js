import express from "express";
import { signIn, signOut, signUp } from "../controllers/auth.js";

const router = express.Router();

// auth routes
router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.post("/sign-out", signOut);

export default router;
