const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },

  teams: [
    {
      teamNumber: Number,

      players: [String], // ["Jake", "Brandon"]

      scores: [Number], // index = hole (0 = hole 1)

      total: {
        type: Number,
        default: 0,
      },
      parTracker: { type: Number, default: 0 },
    },
  ],

  course: {
    name: String,

    holes: [
      {
        hole: Number,
        par: Number,
        distance: Number,
      },
    ],
  },
});

module.exports = mongoose.model("Tournament", TournamentSchema);
