const express = require("express");
const router = express.Router();
const {
    postRating,
    findYourRatings,
    avgRating,
    findAllYourRatings,
    updateRating,
} = require("../controllers/ratingController");

// Post rating
router.post("/", postRating);

// Find rating
router.get("/rated/:userId/:brewId", findYourRatings);

// Average rating
router.get("/average/:brewId", avgRating);

// Fing all your ratings
router.get("/yourratings/:userId", findAllYourRatings);

// Update rating
router.put("/:userId/:brewId", updateRating);

module.exports = router;