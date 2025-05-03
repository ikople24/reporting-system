import express from "express";
import listProbsModel from "../models/listProbsModel.js";

const router = express.Router();

// GET all
router.get("/listprobs", async (req, res) => {
  try {
    const data = await listProbsModel.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data from MongoDB" });
  }
});

// POST create
router.post("/listprobs", async (req, res) => {
  const newData = new listProbsModel(req.body);
  await newData.save();
  res.status(201).json(newData);
});

// PUT update
router.put("/listprobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await listProbsModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update" });
  }
});

// DELETE
router.delete("/listprobs/:id", async (req, res) => {
  await listProbsModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});



export default router;
