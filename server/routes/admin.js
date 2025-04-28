const express = require("express");
const router = express.Router();

//controllers 

const { authCheck } = require("../middlewares/auth");

// @endpoint http://localhost:4000/api/stats
router.get('/stats', authCheck, (req, res) => {
      res.json({
        message: "Protected route accessed",
        user: req.user, // มาจาก middleware
      });
    });

module.exports = router;