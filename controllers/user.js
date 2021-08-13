const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// mongoose model
const userModel = require("../models/user");
const generateToken = require("../Utils/generateToken");

exports.userAll = async (req, res) => {
  try {
    const user = await userModel.find();
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.registerUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const userExists = await userModel.findOne({ email });

  if (userExists) {
    throw new Error("User already exists");
  }

  const user = await userModel.create({
    email,
    password,
    name: `${firstName} ${lastName}`,
  });

  if (user) {
    return res
      .status(201)
      .json({ _id: user._id, name: user.name, token: generateToken(user._id) });
  } else {
    throw new Error("Error OIccured");
  }
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  const isPasswordCorrect = await user.matchPassword(password);

  if (user && isPasswordCorrect) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

exports.signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const userExists = await userModel.findOne({ email });

    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await userModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await userModel.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await userModel.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await userModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
