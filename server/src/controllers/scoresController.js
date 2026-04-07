require("dotenv").config();
const Score = require("../models/Score");

const getRecentScores = async (req, res) => {
  try {
    const scores = await Score.find().sort({ _id: -1 }).limit(5);

    return res.status(200).json({ scores });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting Recents" });
  }
};

const getUserRecents = async (req, res) => {
  try {
    const { userId } = req.body;

    const userRecents = await Score.find({ userId });

    return res.status(200).json({ userRecents });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting User Recents" });
  }
};

module.exports = { getRecentScores, getUserRecents };
