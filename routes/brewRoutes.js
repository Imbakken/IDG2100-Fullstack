const express = require("express");
const router = express.Router();
const {
    registerBrew,
    getBrew,
    getAllBrews,
    checkBrew,
    takeBrew,
    existingBrew,
    deleteBrew,
} = require("../controllers/brewController");

// Create brew 
router.post("/", registerBrew);

// Read all brews
router.get("/", getAllBrews);

// Read latest brew
router.get("/latest", getBrew);

// Check brew
router.get("/check", checkBrew);

// Update brew
router.patch("/:_id", takeBrew);

// Update existing brew
router.patch("/reset/:_id", existingBrew);

// Delete brew
router.delete("/:_id", deleteBrew);

module.exports = router;
