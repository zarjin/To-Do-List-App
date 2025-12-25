import type { Request, Response } from "express";
import { userModels } from "../models/user.models.ts";
import { hashingPassword, comparePassword } from "../utils/bcrypt.utils.ts";
import { generateToken } from "../utils/jwt.utils.ts";

export const Register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(500)
        .json({ message: "Data is not coming from body 😣" });
    }

    const existingUser = await userModels.findOne({ email });
    if (existingUser) {
      return res.status(500).json({ message: "user already existing 😒" });
    }

    const hashPassword = await hashingPassword(password);

    const User = await userModels.create({
      profile: req.file?.path,
      name,
      email,
      password: hashPassword,
    });

    const token = generateToken(User._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      JWT_Token: token,
      user: User,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(500)
        .json({ message: "Data is not coming from body 😣" });
    }

    const existingUser = await userModels.findOne({ email });
    if (!existingUser) {
      return res.status(500).json({ message: "user is not existing 😥" });
    }

    const isMatch = await comparePassword(password, existingUser.password);

    if (!isMatch) {
      return res.status(500).json({ message: "Your Password not match 😵‍💫" });
    }

    const token = generateToken(existingUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      JWT_Token: token,
      user: existingUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const Logout = async (_req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logged out successfully 😊" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error 😥" });
  }
};

export const checkAuthenticated = async (_req: Request, res: Response) => {
  try {
    return res.status(200).json({ Authenticated: true });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
