const express = require("express");

const router = express.Router();

const {
  saveLearningPath,
  getLearningPaths,
  toggleStep,
  deleteLearningPath,
} = require("../controllers/learningController");
const { protect } = require("../middleware/authMiddleware");

router.post("/save", protect, saveLearningPath);

router.get("/", protect, getLearningPaths);

router.put("/toggle", protect, toggleStep);

router.delete("/:pathId", protect, deleteLearningPath);

module.exports = router;
