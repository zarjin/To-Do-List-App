import {
  Register,
  Login,
  Logout,
  checkAuthenticated,
} from "../controllers/auth.controller.ts";
import { Authenticated } from "../middlewares/authenticated.middlewares.ts";
import { upload } from "../utils/multer.utils.ts";
import express from "express";

const authRoutes = express.Router();

authRoutes.post("/register", upload.single("profile"), Register);
authRoutes.post("/login", Login);
authRoutes.post("/logout", Authenticated, Logout);
authRoutes.get("/checkAuthenticated", Authenticated, checkAuthenticated);

export default authRoutes;
