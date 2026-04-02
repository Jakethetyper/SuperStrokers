require("dotenv").config();
const Tournament = require("../models/Tournament");

const addTournamentData = async (req, res) => {
  try {
    const { teams, course, year } = req.body;

    const formattedTeams = teams.map((team, index) => ({
      teamNumber: index + 1,
      players: team.players,
      scores: Array(18).fill(null),
      total: 0,
    }));

    const tournament = await Tournament.create({
      year,
      teams: formattedTeams,
      course,
    });

    return res.status(200).json(tournament);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating tournament" });
  }
};

const getTournamentData = async (req, res) => {
  try {
    const { year } = req.body;

    const tournyData = await Tournament.findOne({ year });

    return res.status(200).json({ tournyData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting Data" });
  }
};

const submitScore = async (req, res) => {
  try {
    const { score, teamNumber, hole, year } = req.body;

    const tournament = await Tournament.findOne({ year });

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    const team = tournament.teams.find((t) => t.teamNumber === teamNumber);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const holeIndex = hole - 1;

    team.scores[holeIndex] = score;

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    team.total = team.scores.reduce((sum, s) => sum + (s || 0), 0);

    const getPar = tournament.course.holes[holeIndex].par;

    const parScore = score - getPar;
    console.log(parScore, score, getPar);

    team.parTracker += parScore;

    await tournament.save();

    return res.status(200).json(team);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error adding score" });
  }
};

module.exports = { addTournamentData, getTournamentData, submitScore };
