const asyncHandler = require("express-async-handler");

// mongoose model
const Historie = require("../models/historieModel");

const historieAll = asyncHandler(async (req, res) => {
  const historie = await Historie.find();
  if (historie) {
    res.json({ historie });
  }
  res.status(500).json({ error: error.message });
});

// const createHistorie = asyncHandler(async (req, res) => {
//   const {Idapi, generic_name, image_front_url, isFavorite } = req.body;

//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     res.status(404);
//     throw new Error("User already exists");
//   }

//   const historie = await Historie.create({
//     Idapi,
//     generic_name,
//     image_front_url,
//     isFavorite
//   });

//   if (user) {
//     res.status(201).json({
//       _id: historie._id,
//       isFavorite: historie.isFavorite,
//       generic_name: historie.generic_name,
//       Idapi: historie.Idapi,
//       image_front_url: historie.image_front_url,
//       token: generateToken(historie._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("User not found");
//   }
// });

const createHistorie = asyncHandler(async (req, res) => {
  const {api_id, generic_name, image_front_small_url, isFavorite, allergen } = req.body;

  console.log("requête:", api_id, generic_name, image_front_small_url, isFavorite, allergen);
  if (!api_id) {
    console.log("test historie:") 
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const historie = new Historie({ user_id: req.user._id, api_id, generic_name, image_front_small_url, isFavorite, allergen });

    const createHistorie = await historie.save();

    res.status(201).json(createHistorie);
  }
});


module.exports = {
  historieAll,
  createHistorie
};
