const router = require("express").Router();
const { check } = require("express-validator");
const dotenv = require("dotenv").config();
const { registerUser, loginUser, } = require("../controllers/authController");

// Register user
router.post(
    "/register",
    [
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 8 or more characters"
      ).isLength({ min: 8 }),
    ],
    registerUser
);

// Login user
router.post(
    "/login",
    [
      check("username", "Please include a valid username").isLength({ min: 1 }),
      check("password", "Password is required").exists(),
    ],
    loginUser
  );

  
  module.exports = router;
  