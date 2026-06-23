const Feedback = require("../models/Feedback");

const submitFeedback = async (req, res) => {
  try {
    let { type, message } = req.body;

    if (!type || !message) {
      return res.status(400).json({ message: "Type and message are required" });
    }

    // Normalize type to lowercase and trim
    type = type.toLowerCase().trim();

    const feedback = await Feedback.create({
      user: req.user._id,
      type,
      message,
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitFeedback,
  getMyFeedbacks,
};
