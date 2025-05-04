import express from "express";
import { requireRole, requireRoles } from "../middlewares/auth.js";
import multer from "multer";
import sharp from "sharp";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/upload",
  requireRoles(["admin", "editor"]),
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      // ✅ ใช้ sharp resize ภาพจาก buffer
      const resizedBuffer = await sharp(req.file.buffer)
        .resize({ width: 600 }) // 👉 กำหนดความกว้าง 800px (หรือปรับตามต้องการ)
        .toBuffer();

      // ✅ upload ไป Cloudinary จาก buffer
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "listprobs" },
        (error, result) => {
          if (error) return res.status(500).json({ error: error.message });
          res.json(result); // สำเร็จ → ส่ง URL กลับ
        }
      );

      // ✅ stream buffer เข้า uploadStream
      streamifier.createReadStream(resizedBuffer).pipe(uploadStream);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Upload failed" });
    }
  }
);

export default router;
