import mongoose from "mongoose";

export const connectedDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected 📊");
  } catch (error) {
    console.error("MongoDB Connect Error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
