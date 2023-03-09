const User = require("../models/userSchema");

const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

// Register a new user
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).json({ errors: [{ msg: "Email already exists" }] });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  })

  try {
    const savedUser = await user.save();
    res.send(savedUser)
  } catch (err) {
    res.status(400).send(err)
  }
};

// Login user
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
  }
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
  }

  const payload = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: 3600,
    }
  );
  res.header("auth-token", payload).send(payload);
};

module.exports = {
  registerUser,
  loginUser,
};
