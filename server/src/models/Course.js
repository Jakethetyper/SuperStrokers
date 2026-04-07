const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },

  courseRating: {
    type: Number,
    required: true,
  },

  holes: {
    type: Number,
    required: true,
    default: 18,
  },

  highestScore: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user: {
      type: String,
    },
    score: {
      type: Number,
    },
  },

  topScores: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      user: {
        type: String,
      },
      score: {
        type: Number,
      },
    },
  ],
  eachHole: [
    {
      hole: {
        type: String,
      },
      par: { type: Number },
      distance: { type: Number },
    },
  ],
  courseDifficulty: {
    type: String,
    default: "0/0",
  },
});

module.exports = mongoose.model("Course", courseSchema);
