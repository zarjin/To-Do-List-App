import mongoose from "mongoose";

export interface userI extends mongoose.Document {
  profile: string;
  name: string;
  email: string;
  password: string;
}

export interface todoI extends mongoose.Document {
  text: string;
}
