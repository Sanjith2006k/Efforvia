const express = require("express");
const router = express.Router();

const { submitFeedback, getMyFeedbacks } = require("../controllers/feedbackController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, submitFeedback);
router.get("/my", protect, getMyFeedbacks);

module.exports = router;
