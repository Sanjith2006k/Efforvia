const User = require("../models/User");
const Feedback = require("../models/Feedback");
const LearningPath = require("../models/LearningPath");
const { createLog } = require("../controllers/logController");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    // Log the action
    createLog(req.user._id, "Viewed all users", "Admin viewed the list of all users", req);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    // Log the action
    createLog(req.user._id, "Viewed all feedbacks", "Admin viewed all feedbacks", req);
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFeedbackStatus = async (req, res) => {
  try {
    let { status } = req.body;
    if (status) {
      status = status.toLowerCase().trim();
    }
    const feedback = await Feedback.findById(req.params.id);

    if (feedback) {
      const oldStatus = feedback.status;
      feedback.status = status || feedback.status;
      const updatedFeedback = await feedback.save();
      // Log the action
      createLog(
        req.user._id,
        "Updated feedback status",
        `Admin changed feedback ID ${req.params.id} status from ${oldStatus} to ${feedback.status}`,
        req
      );
      res.json(updatedFeedback);
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const feedbackCount = await Feedback.countDocuments();
    const pendingFeedbackCount = await Feedback.countDocuments({ status: "pending" });

    // Log the action
    createLog(req.user._id, "Viewed stats", "Admin viewed the dashboard statistics", req);

    res.json({
      users: userCount,
      totalFeedback: feedbackCount,
      pendingFeedback: pendingFeedbackCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllLearningPaths = async (req, res) => {
  try {
    const learningPaths = await LearningPath.find({}).sort({ createdAt: -1 });
    // Log the action
    createLog(req.user._id, "Viewed all learning paths", "Admin viewed all learning paths", req);
    res.json(learningPaths);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLearningPath = async (req, res) => {
  try {
    const { topic, roadmap } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    // Ensure roadmap is an array of objects with title property
    const formattedRoadmap = Array.isArray(roadmap)
      ? roadmap.map(item =>
          typeof item === 'string'
            ? { title: item }
            : {
                title: item.title || '',
                completed: false,
                quizScore: 0,
                completedAt: undefined,
                notes: [],
                videos: []
              }
        )
      : [];

    const learningPath = await LearningPath.create({
      topic,
      roadmap: formattedRoadmap,
    });

    // Log the action
    createLog(req.user._id, "Created learning path", `Admin created learning path: ${topic}`, req);
    res.status(201).json(learningPath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLearningPath = async (req, res) => {
  try {
    const { topic, roadmap } = req.body;
    const learningPath = await LearningPath.findById(req.params.id);

    if (!learningPath) {
      return res.status(404).json({ message: "Learning path not found" });
    }

    learningPath.topic = topic || learningPath.topic;
    if (Array.isArray(roadmap)) {
      learningPath.roadmap = roadmap.map(item =>
        typeof item === 'string'
          ? { title: item }
          : {
              title: item.title || '',
              completed: item.completed !== undefined ? item.completed : false,
              quizScore: item.quizScore !== undefined ? item.quizScore : 0,
              completedAt: item.completedAt,
              notes: item.notes || [],
              videos: item.videos || []
            }
      );
    }

    const updatedLearningPath = await learningPath.save();

    // Log the action
    createLog(req.user._id, "Updated learning path", `Admin updated learning path: ${learningPath.topic}`, req);
    res.json(updatedLearningPath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLearningPath = async (req, res) => {
  try {
    const learningPath = await LearningPath.findById(req.params.id);

    if (!learningPath) {
      return res.status(404).json({ message: "Learning path not found" });
    }

    await learningPath.remove();

    // Log the action
    createLog(req.user._id, "Deleted learning path", `Admin deleted learning path: ${learningPath.topic}`, req);
    res.json({ message: "Learning path deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getAllFeedbacks,
  updateFeedbackStatus,
  getStats,
  getAllLearningPaths,
  createLearningPath,
  updateLearningPath,
  deleteLearningPath,
};