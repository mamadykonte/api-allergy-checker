const express = require("express");
const {
  userAll,
  registerUser,
  login,
  updateUserProfile,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

// const { allergens, createAllergens } = require("../controllers/allergens");
const router = express.Router();

router.get("/userAll", userAll);
router.post("/register", registerUser);
router.post("/login", login);
router.post("/profile", protect, updateUserProfile);
// router.get("/profile", );

module.exports = router;
