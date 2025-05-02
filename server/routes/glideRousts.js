// server/routes/glideRousts.js
import express from "express";
import * as glide from "@glideapps/tables";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// สร้างตาราง glide (token, app, table id ต้องแมปให้ถูก)
const listProbsTable = glide.table({
  token: process.env.GLIDE_TOKEN,
  app: process.env.GLIDE_APP,
  table: "native-table-JYGTeV7qUgAkwWQ8KYAO",
  columns: {
      the: { type: "boolean", name: "แสดงผลเรื่อง" },
      numbershow: { type: "number", name: "ลำดับ" },
      probName: { type: "string", name: "ชื่อเรื่อง" },
      probPic: { type: "image-uri", name: "ไอค่อน" },
      the1: { type: "number", name: "สถิติการกด" },
      locationTb: { type: "string", name: "location_area" }
  }
});

// route ดึงข้อมูลจาก glide
router.get("/listprobs", async (req, res) => {
  const rows = await listProbsTable.get();
  res.json(rows);
});

export default router; // ✅ ต้องเป็น export default
