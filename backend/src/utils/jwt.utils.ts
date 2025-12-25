import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { Types } from "mongoose";

//generateToken
export const generateToken = (userId: Types.ObjectId): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ id: userId }, secret, { expiresIn: "7d" });
};

//verifyToken
export interface TokenPayload extends JwtPayload {
  id: string;
}

export const verifyToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
