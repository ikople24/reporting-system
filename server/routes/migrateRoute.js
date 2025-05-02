import express from "express";
import listProbsModel from "../models/listProbsModel.js"; // MongoDB Schema

const router = express.Router();

// ดึงข้อมูลจาก MongoDB
router.get("/listprobs", async (req, res) => {
  try {
    const rows = await listProbsModel.find();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch from MongoDB" });
  }
});

export default router;
