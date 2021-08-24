const express = require("express");
const {
    historieAll,
    createHistorie
  
} = require("../controllers/historieController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", historieAll);
router.post("/create", protect, createHistorie);
// router.post("/favorited", Favorited)
// router.delete("/delete/:id", deleteFavorites)

// router.get("/profile", );

module.exports = router;
