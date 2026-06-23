const LearningPath = require("../models/LearningPath");
const notesService = require("../services/notesService");
const youtubeService = require("../services/youtubeService");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const enrichPath = async (path) => {
  const pathObject = path.toObject ? path.toObject() : path;
  let needsUpdate = false;

  const roadmap = await Promise.all(
    pathObject.roadmap.map(async (step, index) => {
      let stepNotes = step.notes;
      let stepVideos = step.videos;

      if (!stepNotes || stepNotes.length === 0) {
        stepNotes = notesService.getStepNotes(pathObject.topic, step.title);
        path.roadmap[index].notes = stepNotes;
        needsUpdate = true;
      }

      if (!stepVideos || stepVideos.length === 0) {
        stepVideos = await youtubeService.searchStepVideos(pathObject.topic, step.title);
        path.roadmap[index].videos = stepVideos;
        needsUpdate = true;
      }

      return {
        ...step,
        notes: stepNotes,
        videos: stepVideos,
      };
    }),
  );

  if (needsUpdate) {
    await path.save();
  }

  return {
    ...pathObject,
    roadmap,
  };
};

exports.saveLearningPath = async (req, res) => {
  try {
    const { topic, roadmap } = req.body;

    const existingPath = await LearningPath.findOne({
      user: req.user._id,
      topic: new RegExp(`^${escapeRegex(topic)}$`, "i"),
    });

    if (existingPath) {
      return res.status(400).json({
        message: "This learning path is already saved.",
      });
    }

    const roadmapWithDetails = await Promise.all(
      roadmap.map(async (item) => {
        const notes = notesService.getStepNotes(topic, item);
        const videos = await youtubeService.searchStepVideos(topic, item);
        return {
          title: item,
          notes,
          videos,
        };
      }),
    );

    const path = await LearningPath.create({
      user: req.user._id,
      topic,
      roadmap: roadmapWithDetails,
    });

    res.status(201).json(path);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getLearningPaths = async (req, res) => {
  try {
    const paths = await LearningPath.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    const enrichedPaths = await Promise.all(paths.map(enrichPath));

    res.json(enrichedPaths);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.toggleStep = async (req, res) => {
  try {
    const { pathId, stepIndex, quizScore = 0 } = req.body;

    const path = await LearningPath.findOne({
      _id: pathId,
      user: req.user._id,
    });

    if (!path) {
      return res.status(404).json({
        message: "Path not found",
      });
    }

    path.roadmap[stepIndex].completed = true;
    path.roadmap[stepIndex].quizScore = Math.max(
      path.roadmap[stepIndex].quizScore || 0,
      quizScore,
    );
    path.roadmap[stepIndex].completedAt = new Date();

    const completedCount = path.roadmap.filter((step) => step.completed).length;

    path.progress = Math.round((completedCount / path.roadmap.length) * 100);

    await path.save();

    res.json(path);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteLearningPath = async (req, res) => {
  try {
    const { pathId } = req.params;

    const path = await LearningPath.findOneAndDelete({
      _id: pathId,
      user: req.user._id,
    });

    if (!path) {
      return res.status(404).json({
        message: "Learning path not found or not authorized",
      });
    }

    res.json({ message: "Learning path removed successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
