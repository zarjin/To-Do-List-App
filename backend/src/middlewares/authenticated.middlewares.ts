import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.utils.ts";

export const Authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      // 401 is the standard for missing/invalid credentials in 2025
      return res
        .status(401)
        .json({ message: "Access denied. Token not found 😣" });
    }

    const decode = verifyToken(token);

    // Attach decoded data to request for use in subsequent routes
    req.user = decode;

    // Important: Call next() to proceed to the actual route handler
    next();
  } catch (error) {
    // If token is expired or invalid, return 401
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
