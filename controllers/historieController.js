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
  const { api_id, generic_name, image_front_small_url, isFavorite, allergen } = req.body;

  console.log("requête:", api_id, generic_name, image_front_small_url, isFavorite, allergen);
  if (!api_id) {
    console.log("test historie:")
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const historie = new Historie({ user: req.user._id, api_id, generic_name, image_front_small_url, isFavorite, allergen });

    const createHistorie = await historie.save();

    res.status(201).json(createHistorie);
  }
})


const updateUserHistory = asyncHandler(async (req, res) => {
  const { api_id, generic_name, image_front_small_url, isFavorite, allergen } = req.body;
 
  const history = await Historie.findById(req.params.id);
  console.log(history);
  console.log('req body', req.body);
  
 
  if (history.user.toString() !== req.user._id.toString()) {
    
    res.status(401)
    throw new Error("You can't perform this action")
  }

  if (history) { 
  history.api_id = api_id || history.api_id;
  history.generic_name = generic_name || history.generic_name;
  history.image_front_small_url = image_front_small_url || history.image_front_small_url;
  history.isFavorite = isFavorite || history.isFavorite;
    history.allergen = allergen || history.allergen;
    // token: generateToken(user._id)
    
    const updatedHistory = await history.save();
    res.json(updatedHistory)
}

    

    // res.json({
    //   _id: updatedHistory._id,
    //   api_id: updatedHistory.api_id,
    //   generic_name: updatedHistory.name,
    //   image_front_small_url: updatedHistory.image_front_small_url,
    //   isFavorite: updatedHistory.isFavorite,
    //   allergen: updatedHistory.allergen,
    //   token: generateToken(updatedHistory._id),
    // });
  else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
  
  

module.exports = {
  historieAll,
  createHistorie,
  updateUserHistory
  
};
