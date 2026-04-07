require("dotenv").config();
const History = require("../models/History");
const User = require("../models/User");

const getHistory = async (req, res) => {
  try {
    const tournamentHistory = await History.find();

    return res.status(200).json({ tournamentHistory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR YOU FUCKED UP" });
  }
};

const getPlayers = async (req, res) => {
  try {
    const players = await User.find();

    return res.status(200).json({ players });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "adding error" });
  }
};

const getAchievements = async (req, res) => {
  try {
    const { userId } = req.body;

    const userAchievements = [];

    const history = await History.find();

    history.forEach((year) => {
      year.teams.forEach((player) => {
        player.players.forEach((person) => {
          if (person.playerRef.toString() === userId) {
            userAchievements.push({
              year: year.year,
              place: player.place,
              score: player.score,
            });
          }
        });
      });
    });

    return res.status(200).json({ userAchievements });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "adding error" });
  }
};

module.exports = {
  getHistory,
  getPlayers,
  getAchievements,
};
