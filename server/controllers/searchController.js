const roadmapService = require("../services/roadmapService");

const notesService = require("../services/notesService");

const youtubeService = require("../services/youtubeService");

exports.searchTopic = async (req, res) => {
  try {
    const topic = req.query.q;

    const roadmap = roadmapService.getRoadmap(topic);

    const notes = notesService.getNotes(topic);

    const videos = await youtubeService.searchVideos(topic);

    res.json({
      success: true,
      topic,
      roadmap,
      notes,
      videos,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
