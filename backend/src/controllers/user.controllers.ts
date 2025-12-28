import { userModels } from "../models/user.models.ts";
import { hashingPassword } from "../utils/bcrypt.utils.ts";
import type { Response } from "express";
import type { AuthRequest } from "../types/types.ts";

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user.id;

    const profileData = await userModels.findById(userId).select("-password");

    return res.status(200).json({
      success: true,
      data: profileData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user.id;

    const { name, email, password } = req.body;

    const hashPassword = await hashingPassword(password);

    const User = await userModels.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        password: hashPassword,
      },
      { new: true }
    );

    return res.status(200).json({
      user: User,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user.id;

    await userModels.findByIdAndDelete(userId);
    return res.status(200).json({ message: "Your Account Deleted Done... 😎" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
