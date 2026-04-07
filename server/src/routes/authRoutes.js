const express = require("express");
const { signup, login } = require("../controllers/authController");
const {
  getProfileStats,
  addScore,
} = require("../controllers/profileController");
const {
  getHistory,
  getPlayers,
  getAchievements,
} = require("../controllers/historyController");
const {
  getCourses,
  addCourse,
  getSingleCourse,
} = require("../controllers/coursesController");
const {
  addTournamentData,
  getTournamentData,
  submitScore,
} = require("../controllers/tournamentController");
const {
  getRecentScores,
  getUserRecents,
} = require("../controllers/scoresController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/getProfileStats", getProfileStats);
router.post("/addScore", addScore);

router.post("/getHistory", getHistory);
router.post("/getPlayers", getPlayers);
router.post("/getAchievements", getAchievements);

router.post("/getCourses", getCourses);
router.post("/addCourse", addCourse);
router.post("/getSingleCourse", getSingleCourse);

router.post("/addTournamentData", addTournamentData);
router.post("/getTournamentData", getTournamentData);
router.post("/submitScore", submitScore);

router.post("/getRecentScores", getRecentScores);
router.post("/getUserRecents", getUserRecents);

module.exports = router;
