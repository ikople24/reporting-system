import express from "express";
import listProbsModel from "../models/listProbsModel.js"; // MongoDB Schema

const router = express.Router();

// รับข้อมูลที่เลือกมาแล้ว save เข้า MongoDB
router.post("/migrate", async (req, res) => {
  try {
    const payload = req.body;
    const result = await listProbsModel.insertMany(payload);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Migration failed" });
  }
});

export default router;
