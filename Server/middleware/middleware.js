import { sendResponseJson } from "../utils/sendResponse.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers?.authorization;
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    return sendResponseJson(res, 404, false, "Token not found");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return sendResponseJson(res, 403, false, "Invalid Token");
    }

    req.userId = decoded.userId;
    next();
  });
};
