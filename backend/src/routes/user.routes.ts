import {
  getProfile,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.ts";
import { Authenticated } from "../middlewares/authenticated.middlewares.ts";
import express from "express";

const userRoutes = express.Router();

userRoutes.get("/profile", Authenticated, getProfile);
userRoutes.put("/update", Authenticated, updateUser);
userRoutes.delete("/delete", Authenticated, deleteUser);

export default userRoutes;
