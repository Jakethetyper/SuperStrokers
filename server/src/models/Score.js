const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  courseName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  courseRating: {
    type: Number,
    required: true,
  },

  score: {
    type: Number,
    required: true,
  },

  playedAt: {
    type: Date,
    default: Date.now,
  },
  comments: {
    type: String,
  },
});

module.exports = mongoose.model("Score", scoreSchema);
