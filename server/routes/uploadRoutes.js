import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js'; // ✅ import cloudinary ที่ config ไว้

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: 'listprobs' },
      (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(result);
      }
    );

    result.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;