import mongoose from "mongoose";
import type { Request } from "express";

export interface userI extends mongoose.Document {
  profile: string;
  name: string;
  email: string;
  password: string;
}

export interface todoI extends mongoose.Document {
  text: string;
  completed: boolean;
  owner: mongoose.Types.ObjectId;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}
