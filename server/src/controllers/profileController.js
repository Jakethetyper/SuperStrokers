require("dotenv").config();
const User = require("../models/User");
const Score = require("../models/Score");
const Course = require("../models/Course");

const getProfileStats = async (req, res) => {
  try {
    const { userId } = req.body;

    const userScores = await Score.find({ userId });
    const userInfo = await User.findOne({ _id: userId });

    return res.status(200).json({ userScores, userInfo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR YOU FUCKED UP" });
  }
};

const addScore = async (req, res) => {
  try {
    const { courseId, score, userId, firstName, courseName } = req.body;

    // 🔍 get course
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ✅ 1. Save score
    const newScore = await Score.create({
      userId,
      courseName,
      courseRating: course.courseRating,
      score,
    });

    // ✅ 2. Update Course.topScores
    course.topScores.push({
      userId,
      user: firstName,
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
      user.rounds = newRounds;

      const numericScore = Number(score);
      const totalScore =
        (user.avgScore || 0) * (user.rounds || 0) + numericScore;
      const newAverageScore = Math.round(totalScore / newRounds);
      user.avgScore = newAverageScore;

      if (score < user.best) {
        user.best = score;
      }

      const improvements = user.improvement.roundsTwo || [];

      // keep last 3 rounds
      if (improvements.length >= 3) {
        improvements.shift(); // removes oldest
      }

      // add new score
      improvements.push(Number(score));

      // calculate average of last 3 rounds
      const improvementTotal = improvements.reduce(
        (sum, s) => sum + Number(s),
        0,
      );

      const improvementAverage = improvementTotal / improvements.length;

      // compare against overall average
      const increment = newAverageScore - improvementAverage;

      // save back
      user.improvement.roundsTwo = improvements;
      user.improvement.increment = increment;

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
