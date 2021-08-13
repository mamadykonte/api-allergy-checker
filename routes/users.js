const express = require("express");
const {
  userAll,
  signin,
  signup,
    registerUser,
  login
} = require("../controllers/user");
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/userAll", userAll);
router.post("/register", registerUser);
router.post("/login", login);

module.exports = router;
