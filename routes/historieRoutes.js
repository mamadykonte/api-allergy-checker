const express = require("express");
const {
    historieAll,
    deleteFavorites
  
} = require("../controllers/historieController");

// const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", historieAll);
// router.delete("/delete/:id", deleteFavorites)

// router.get("/profile", );

module.exports = router;
