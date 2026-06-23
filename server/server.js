const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const searchRoutes = require("./routes/searchRoutes");
const learningRoutes = require("./routes/learningRoutes");
const { securePayloads } = require("./middleware/securityMiddleware");

dotenv.config();

connectDB();

const app = express();

// Rate limiter: max 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { message: "Too many requests from this IP, please try again after 15 minutes" },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(securePayloads); // Sanitize requests against NoSQL Injection

const adminRoutes = require("./routes/adminRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const logRoutes = require("./routes/logRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/search", searchRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/logs", logRoutes);

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Admin",
        email: "admin@efforvia.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("Default admin created (admin@efforvia.com / admin123)");
    }
  } catch (error) {
    console.error("Error seeding admin:", error);
  }
};

app.listen(process.env.PORT, async () => {
  await seedAdmin();
  console.log(`Server Running on ${process.env.PORT}`);
});
