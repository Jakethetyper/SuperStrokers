require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("../models/Course");

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    return res.status(200).json({ courses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error getting courses" });
  }
};

const addCourse = async (req, res) => {
  try {
    const { newName, newHoles, newPar } = req.body;

    // ✅ Basic validation
    if (!newName || !newHoles || !newPar) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // ✅ Convert to numbers
    const holes = Number(newHoles);
    const par = Number(newPar);

    if (isNaN(holes) || isNaN(par)) {
      return res.status(400).json({
        message: "Holes and Par must be numbers",
      });
    }

    const newCourse = await Course.create({
      courseName: newName.trim(),
      holes,
      courseRating: par, // or rename to `par`
    });

    return res.status(200).json({ newCourse });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error adding courses",
    });
  }
};

const getSingleCourse = async (req, res) => {
  try {
    const { id } = req.body;

    const information = await Course.findById({ _id: id });

    return res.status(200).json({ information });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error adding courses",
    });
  }
};

module.exports = { getCourses, addCourse, getSingleCourse };
