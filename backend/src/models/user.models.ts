import type { userI } from "../types/types.ts";

import mongoose from "mongoose";

const userSchema = new mongoose.Schema<userI>({
  profile: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 18,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const userModels = mongoose.model<userI>("User", userSchema);
