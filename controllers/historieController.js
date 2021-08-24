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
// const getHistories = asyncHandler(async (req, res) => {
//     const histories = await Historie.find({ user: req.user.id });
//     res.json(histories);
// })

module.exports = {
    historieAll
};
