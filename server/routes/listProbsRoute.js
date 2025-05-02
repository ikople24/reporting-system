import express from "express";
import listProbsModel from "../models/listProbsModel.js";

const router = express.Router();

// GET all
router.get("/listprobs", async (req, res) => {
  const data = await listProbsModel.find();
  res.json(data);
});

// POST create
router.post("/listprobs", async (req, res) => {
  const newData = new listProbsModel(req.body);
  await newData.save();
  res.status(201).json(newData);
});

// PUT update
router.put("/listprobs/:id", async (req, res) => {
  const updated = await listProbsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/listprobs/:id", async (req, res) => {
  await listProbsModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
