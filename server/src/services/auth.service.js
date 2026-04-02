const bcrypt = require("bcrypt");
const User = require("../models/User");
const { signToken } = require("../utils/jwt");

async function registerUser({ email, password, name }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("Email already in use");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    passwordHash,
    name,
  });

  const token = signToken({ id: user._id });

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  };
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({ id: user._id });

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  };
}

module.exports = {
  registerUser,
  loginUser,
};
