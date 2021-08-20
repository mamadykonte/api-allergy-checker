const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  getAllergens,
  createAllergen,
  getAllergenById,
  updateAllergen,
} = require("../controllers/allergenController");

const router = express.Router();
router.get("/", protect, getAllergens);
router.get("/:id", getAllergenById);
router.post("/create", protect, createAllergen);
router.put("/update/:id", protect, updateAllergen);
// router.delete("/delete/:id", protect, deleteAllergen);

module.exports = router;
