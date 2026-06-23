const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getAllFeedbacks,
  updateFeedbackStatus,
  getStats,
  getAllLearningPaths,
  createLearningPath,
  updateLearningPath,
  deleteLearningPath,
} = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/users", protect, admin, getAllUsers);
router.get("/feedbacks", protect, admin, getAllFeedbacks);
router.put("/feedbacks/:id", protect, admin, updateFeedbackStatus);
router.get("/stats", protect, admin, getStats);
router.get("/learning-paths", protect, admin, getAllLearningPaths);
router.post("/learning-paths", protect, admin, createLearningPath);
router.put("/learning-paths/:id", protect, admin, updateLearningPath);
router.delete("/learning-paths/:id", protect, admin, deleteLearningPath);

module.exports = router;