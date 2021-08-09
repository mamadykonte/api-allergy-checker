const express = require("express");
const { userAll, signin, signup } = require("../controllers/user");
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/userAll", userAll);

module.exports = router;
