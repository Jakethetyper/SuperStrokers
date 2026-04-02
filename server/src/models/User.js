const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    default: "Super Stroker",
  },
  avgScore: {
    type: Number,
  },
  rounds: {
    type: Number,
  },
});

module.exports = mongoose.model("User", userSchema);
