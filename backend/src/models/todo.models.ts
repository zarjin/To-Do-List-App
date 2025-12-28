import type { todoI } from "../types/types.ts";
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema<todoI>(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    completed: { type: Boolean, default: false },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const todoModels = mongoose.model<todoI>("Todo", todoSchema);
