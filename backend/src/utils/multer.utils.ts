import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.config.ts";

const storageProfile = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (_req, file) => {
    return {
      folder: "todos",
      allowed_formats: ["jpg", "png", "jpeg"],
      public_id: file.originalname.split(".")[0],
    };
  },
});

export const upload = multer({ storage: storageProfile });
