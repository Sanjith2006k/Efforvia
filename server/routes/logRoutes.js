const express = require("express");
const router = express.Router();

const { getAllLogs } = require("../controllers/logController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", protect, admin, getAllLogs);

module.exports = router;