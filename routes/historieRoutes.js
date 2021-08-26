const express = require("express");
const {
    historieAll,
    createHistorie,
    updateUserHistory
  
} = require("../controllers/historieController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", historieAll);
router.post("/create", protect, createHistorie);
router.put("/updated/:id",protect ,updateUserHistory)
// router.delete("/delete/:id", deleteFavorites)

// router.get("/profile", );

module.exports = router;
