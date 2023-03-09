const User = require("../models/userSchema");

const { response } = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// Admin can create users
const createUser = async (req, res) => {
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

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const get = await User.find();
    return res.json(get);
  } catch (error) {
    return response.json(error);
  }
};

// Find a user
const findUser = async (req, res) => {
  try {
    const user = await User.find({ _id: req.params._id });
    res.status(200).json({ user });
  } catch (error) {
    res.json({ message: error });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const _id = req.params;
    const update = await User.findOneAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(update);
  } catch (e) {
    res.status(404).send(e);
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params._id });
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  findUser,
  updateUser,
  deleteUser,
};
