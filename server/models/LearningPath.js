const mongoose = require("mongoose");

const learningPathSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    topic: {
      type: String,
      required: true,
    },

    roadmap: [
      {
        title: String,
        completed: {
          type: Boolean,
          default: false,
        },
        quizScore: {
          type: Number,
          default: 0,
        },
        completedAt: {
          type: Date,
        },
        notes: [
          {
            title: String,
            description: String,
            url: String,
          },
        ],
        videos: [
          {
            title: String,
            channel: String,
            thumbnail: String,
            url: String,
            videoId: String,
          },
        ],
      },
    ],

    progress: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("LearningPath", learningPathSchema);
