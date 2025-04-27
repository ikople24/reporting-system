const express = require("express");
const router = express.Router();

//controllers 
const { listStats } = require("../controllers/admin");
const { authCheck } = require("../middlewares/auth");

// @endpoint http://localhost:4000/api/stats
router.get("/stats",authCheck, listStats);



module.exports = router;