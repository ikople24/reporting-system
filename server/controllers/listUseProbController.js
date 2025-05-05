import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all
export const getListUseProbs = async (req, res) => {
  try {
    const data = await prisma.listUseProb.findMany({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by id
export const getListUseProbById = async (req, res) => {
  const { id } = req.params;
  try {
    const listUseProb = await prisma.listUseProb.findUnique({
      where: { id },
    });

    if (!listUseProb) return res.status(404).json({ message: "Not found" });

    // Manual join: query listProb โดยใช้ listProbId
    const listProb = await prisma.listProb.findUnique({
      where: { id: listUseProb.listProbId },
    });

    res.json({ ...listUseProb, listProb });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// CREATE
export const createListUseProb = async (req, res) => {
  const { Prob_menu, Prob_pickup, pick_icon, listProbId } = req.body;
  try {
    const data = await prisma.listUseProb.create({
      data: { Prob_menu, Prob_pickup, pick_icon, listProbId },
    });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateListUseProb = async (req, res) => {
  const { id } = req.params;
  const { Prob_menu, Prob_pickup, pick_icon, listProbId } = req.body;
  try {
    const data = await prisma.listUseProb.update({
      where: { id },
      data: { Prob_menu, Prob_pickup, pick_icon, listProbId },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteListUseProb = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.listUseProb.delete({ where: { id } });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
