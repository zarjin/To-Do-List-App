import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./configs/db.config.ts";
import authRoutes from "./routes/auth.routes.ts";
import userRoutes from "./routes/user.routes.ts";
import todoRoutes from "./routes/todo.routes.ts";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Hello Todo App");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} 🚀`);
});
