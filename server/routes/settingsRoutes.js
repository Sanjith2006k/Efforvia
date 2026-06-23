const express = require("express");
const router = express.Router();

const { changePassword } = require("../controllers/settingsController");
const { protect, admin } = require("../middleware/authMiddleware");

router.put("/change-password", protect, admin, changePassword);

module.exports = router;