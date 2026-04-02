const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  teams: [
    {
      players: [
        {
          playerRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          player: {
            type: String,
          },
        },
      ],
      score: {
        type: Number,
      },
      place: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("History", historySchema);
