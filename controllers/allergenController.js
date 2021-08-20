const asyncHandler = require("express-async-handler");

// mongoose model
const Allergen = require("../models/allergenModel");

// @desc    Get logged in user allergens
// @route   GET /api/notes
// @access  Private
const getAllergens = asyncHandler(async (req, res) => {
  const notes = await Allergen.find({ user: req.user._id });
  res.json(notes);
});

//@description     Fetch single allergen
//@route           GET /allergen/:id
//@access          Public
const getAllergenById = asyncHandler(async (req, res) => {
  const allergen = await Allergen.findById(req.params.id);

  if (allergen) {
    res.json(allergen);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(allergen);
});



//@description     Create single Allergen
//@route           GET /allergen/create
//@access          Private
const createAllergen = asyncHandler(async (req, res) => {
  const { allergy } = req.body;

  if (!allergy) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const allergen = new Allergen({ user: req.user._id, allergy });

    const createdAllergen = await allergen.save();

    res.status(201).json(createdAllergen);
  }
});

// @desc    Update allergen
// @route   PUT /allergen/:id
// @access  Private
const updateAllergen = asyncHandler(async (req, res) => {
  

  const allergen = await Allergen.findById(req.params.id);

  if (allergen.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (allergen) {
    allergen.allergy = req.body.allergy || allergen.allergy;

    const updatedAllergen = await allergen.save();
    res.json(updatedAllergen);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});



module.exports = {
  getAllergens,
  createAllergen,
  getAllergenById,
  updateAllergen,
};
