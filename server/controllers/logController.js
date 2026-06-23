const Log = require("../models/Log");

// Get all logs (admin only)
const getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find({})
      .populate("admin", "name email")
      .sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a log entry (called from other controllers or middleware)
const createLog = async (adminId, action, details, req) => {
  try {
    await Log.create({
      admin: adminId,
      action,
      details: details || "",
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent") || "",
    });
  } catch (error) {
    console.error("Error creating log:", error);
  }
};

module.exports = {
  getAllLogs,
  createLog,
};