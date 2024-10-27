const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, console.log(`Database connected to ${mongoURI}`));

// Create Video Schema
const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  details: String,
  filename: String,
  contentType: String,
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  content: Buffer, // Store video directly as Buffer
});

const Video = mongoose.model("Video", videoSchema);

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
}).single("video");

// Upload endpoint
app.post("/api/upload", (req, res) => {
  console.log(req.body, req.body.title, req.file);
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`,
      });
    } else if (err) {
      return res.status(500).json({
        success: false,
        message: `Server error: ${err.message}`,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a video file",
      });
    }

    try {
      const newVideo = new Video({
        title: req.body.title,
        description: req.body.description,
        details: req.body.details,
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        content: req.file.buffer,
      });

      const savedVideo = await newVideo.save();

      res.json({
        success: true,
        video: {
          id: savedVideo._id,
          title: savedVideo.title,
          description: savedVideo.description,
          details: savedVideo.details,
          filename: savedVideo.filename,
          uploadDate: savedVideo.uploadDate,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Database error: ${error.message}`,
      });
    }
  });
});

// Get video list endpoint
app.get("/api/videos", async (req, res) => {
  try {
    const videos = await Video.find({}, {});
    res.json({
      success: true,
      videos: videos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Database error: ${error.message}`,
    });
  }
});

// Get single video endpoint
app.get("/api/videos/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    // Set the proper content type for the response
    res.set("Content-Type", video.contentType);
    res.send(video.content);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Database error: ${error.message}`,
    });
  }
});

// Delete video endpoint
app.delete("/api/videos/:id", async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Database error: ${error.message}`,
    });
  }
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
