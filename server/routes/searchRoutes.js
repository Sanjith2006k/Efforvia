const express = require("express");

const router = express.Router();

const { searchTopic } = require("../controllers/searchController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, searchTopic);

module.exports = router;
