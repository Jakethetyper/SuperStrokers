require("dotenv").config();
const User = require("../models/User");
const Score = require("../models/Score");
const Course = require("../models/Course");

const getProfileStats = async (req, res) => {
  try {
    const { userId } = req.body;

    const userScores = (await Score.find({ userId })).toSorted({
      createdAt: -1,
    });

    console.log(userScores);

    return res.status(200).json({ totalGames: userScores.length, userScores });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR YOU FUCKED UP" });
  }
};

const addScore = async (req, res) => {
  try {
    const { courseId, score, userId } = req.body;

    // 🔍 get course
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ✅ 1. Save score
    const newScore = await Score.create({
      userId,
      courseName: course._id,
      courseRating: course.courseRating,
      score,
    });

    // ✅ 2. Update Course.topScores
    course.topScores.push({
      userId,
      score,
    });

    // keep only best scores (lowest first)
    course.topScores = course.topScores
      .sort((a, b) => a.score - b.score)
      .slice(0, 10); // keep top 10

    // ✅ 3. Update Course.highestScore (best score)
    if (!course.highestScore.score || score < course.highestScore.score) {
      course.highestScore = {
        userId,
        score,
      };
    }

    await course.save();

    // ✅ 4. Update User stats
    const user = await User.findById(userId);

    if (user) {
      const newRounds = (user.rounds || 0) + 1;

      const totalScore = (user.avgScore || 0) * (user.rounds || 0) + score;

      user.rounds = newRounds;
      user.avgScore = Math.round(totalScore / newRounds);

      await user.save();
    }

    return res.status(200).json({
      message: "Score submitted successfully",
      score: newScore,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error submitting score" });
  }
};

module.exports = {
  getProfileStats,
  addScore,
};
