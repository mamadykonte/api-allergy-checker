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

const postHistorieId = asyncHandler(async (req, res) => {
  const historie = await Historie.find({ "Idapi": req.body.Idapi })
    .exec((err, subscribe) => {
      if (err) return res.status(400).send(err)
      res.status(200).json({ success: true, subscribeNumber: subscribe.length })
    })
});

const Favorited = asyncHandler(async (req, res) => {
  const favorite = await Favorite.find({ "Idapi": req.body.Idapi })
    .exec((err, subscribe) => {
      if (err) return res.status(400).send(err)
      
      let result = false;
      if (subscribe.length !== 0) {
        result = true
      }

      res.status(200).json({success: true, subscribed: result})
    })
})


// const postHistorieId = asyncHandler(async (req, res) => {
//   const historie = await Historie.findById({ "Idapi": req.body.Idapi })
//     .exec((err, historie) => {
//       if (historie) {
//         res.json(historie);
//       } else {
//         res.status(400).json({ message: "Note not found" });
//       }
//       res.status(200).json(historie)
//     })
// })
// const getHistories = asyncHandler(async (req, res) => {
//     const histories = await Historie.find({ user: req.user.id });
//     res.json(histories);
// })

module.exports = {
  historieAll,
  postHistorieId,
  Favorited
};
