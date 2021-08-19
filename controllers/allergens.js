const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// mongoose model
const allergensModel = require("../models/allergens");
const userModel = require("../models/user");
const generateToken = require("../Utils/generateToken");

//Join two collections using mongoose and get data from both
const allergens = async (req, res) => {
  try {
    const user = await allergensModel.find();
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createAllergens = asyncHandler(async (req, res) => {
  const { allergy, api_id } = req.body;
  // const userExists = await userModel.findOne({ email });

  // if (userExists) {
  //   res.status(400);
  //   throw new Error("User already exists");
  // }

  const user = await allergensModel.create({
    allergy,
    api_id,
  });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      allergy: user.allergy,
      api_id: user.api_id,
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});

module.exports = { allergens, createAllergens };
