import { errorHandler } from "../utils/error.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// Sign in function
export const signIn = async (req, res, next) => {
  const { username, password } = req.body; // access the data

  if (!username || !password) {
    return next(errorHandler(400, "Username and password are required"));
  }

  try {
    const user = await User.findOne({ username }); // find the user

    if (!user) return next(errorHandler(404, "User not found"));

    const isPasswordValid = await bcrypt.compare(password, user.password); // compare the hashed password in the db with input password to verify

    if (!isPasswordValid) return next(errorHandler(400, "Invalid password"));

    const { password: userPassword, ...userWithoutPassword } = user._doc; // remove the password from user_doc to send to the client side

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    }); // create the access token

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json(userWithoutPassword); // save the access token in the client side as a coookie (expires in 5h) and send the user details
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Internal Server Error"));
  }
};

// Sign up function
export const signUp = async (req, res, next) => {
  const { username, password, telegramId } = req.body; // access the data

  if (!username || !password || !telegramId) {
    return next(
      errorHandler(400, "Username, password and telegramId are required")
    );
  }

  try {
    const exitingUser = await User.findOne({ username });
    const exitingTelegramId = await User.findOne({ telegramId });
    if (exitingUser || exitingTelegramId)
      return next(errorHandler(400, "Username or TelegramId already exists"));
    const hashedPassword = await bcrypt.hash(password, 10); // hash the password before send to the db

    const user = new User({
      username,
      password: hashedPassword,
      telegramId,
    });

    await user.save();

    if (!user) return next(errorHandler(500, "Failed to create user"));

    const { password: userPassword, ...userWithoutPassword } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    }); // create the token

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        secure: true,
        sameSite: "none",
        maxAge: 3600000 * 5,
      })
      .json(userWithoutPassword); // send token with user details
  } catch (error) {
    console.log(error);
    return next(errorHandler(500, "Internal Server Error"));
  }
};

// Sign out function
export const signOut = (req, res) => {
  try {
    res.clearCookie("token").send("Logged out"); // clear the cookie on the client side
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};

// Reset password function
export const resetPassword = async (req, res, next) => {
  const { username, telegramId, password } = req.body;

  if (!username || !telegramId) {
    return next(errorHandler(400, "Username and telegramId are required"));
  }

  try {
    const user = await User.findOne({ username, telegramId });
    if (!user) return next(errorHandler(404, "User not found"));

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();
    res.status(200).json("Password reset successfully");
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};
