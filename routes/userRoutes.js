const express = require("express");
const router = express.Router();
const { 
    createUser,
    getAllUsers, 
    findUser,
    updateUser, 
    deleteUser, 
} = require("../controllers/userController");

// Create user
router.post("/", createUser);

// Get all users
router.get("/", getAllUsers);

// Find user by id 
router.get("/:_id", findUser);

// Update User
router.patch("/:_id", updateUser);

// Delete User
router.delete("/:_id", deleteUser);

module.exports = router;
