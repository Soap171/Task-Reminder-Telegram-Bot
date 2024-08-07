import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // acess the token

  if (!token) {
    return next(errorHandler(404, "Token not found"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // add the decoed tooken to the request
    console.log(req.userId, "user id");
    next();
  } catch (error) {
    return next(errorHandler(401, "Token not valid"));
  }
};
