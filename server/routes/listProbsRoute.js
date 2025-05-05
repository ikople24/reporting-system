import express from "express";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = express.Router();

// GET all
router.get("/listprobs", async (req, res) => {
  const probs = await prisma.listProb.findMany({
    orderBy: { DP_Order: "asc" },
  });
  res.json(probs);
});

// POST create
router.post("/listprobs", async (req, res) => {
  try {
    const { Prob_name, DP_Order, Prob_pic } = req.body;
    const newProb = await prisma.listProb.create({
      data: { Prob_name, DP_Order: parseInt(DP_Order), Prob_pic },
    });
    res.json(newProb);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating problem" });
  }
});

// PUT update
router.put("/listprobs/:id", async (req, res) => {
  const { id } = req.params;
  const { Prob_name, DP_Order, Prob_pic } = req.body;

  const updated = await prisma.listProb.update({
    where: { id },
    data: { Prob_name, DP_Order: parseInt(DP_Order), Prob_pic },
  });

  res.json(updated);
});

// DELETE
router.delete("/listprobs/:id", async (req, res) => {
  await prisma.listProb.delete({
    where: { id: req.params.id },
  });
  res.json({ message: "Deleted" });
});

router.put("/listprobs/:id", async (req, res) => {
  const { Prob_name, DP_Order, Prob_pic } = req.body;
  const updated = await prisma.listProb.update({
    where: { id: req.params.id },
    data: { Prob_name, DP_Order: parseInt(DP_Order), Prob_pic },
  });
  res.json(updated);
});



export default router;
