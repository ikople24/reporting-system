// server/models/listProbsModel.js
import mongoose from "mongoose";

const listProbsSchema = new mongoose.Schema({
  the: Boolean,
  "1ToqF": Number,
  Prob_name: String,
  Prob_pic: String,
  KBFBi: Number,
  Location_Tb: String,
  $rowID: String,
  $rowIndex: String,
}, { timestamps: true }); // เพิ่ม createdAt, updatedAt อัตโนมัติ

const listProbsModel = mongoose.model("ListProbs", listProbsSchema);

export default listProbsModel;
