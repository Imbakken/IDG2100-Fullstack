const Rating = require("../models/ratingSchema");

// Create new rating
const postRating = async (req, res) => {
  try {
    const brewRating = new Rating({
      brewId: req.body.brewId,
      userId: req.body.userId,
      rating: req.body.rating,
      brewName: req.body.brewName,
      grind: req.body.grind,
      water: req.body.water,
      gram: req.body.gram,
      createdAt: req.body.createdAt,
    });
    brewRating.save().then((data) => {
      res.json(data);
    });
  } catch (e) {
    return res.json(e.message);
  }
};

// Find your rating
const findYourRatings = async (req, res) => {
  try {
    const rating = await Rating.find({
      userId: req.params.userId,
      brewId: req.params.brewId,
    });
    return res.json(rating);
  } catch (e) {
    return res.json(e.message);
  }
};

// Find all your ratings based on user id
const findAllYourRatings = async (req, res) => {
  try {
    const rating = await Rating
      .find({
        userId: req.params.userId,
      })
      .sort({ createdAt: -1 });
    return res.json(rating);
  } catch (e) {
    return res.json(e.message);
  }
};

// Update rating
const updateRating = async (req, res) => {
  try {
    const rating = await Rating.findOneAndUpdate(
      { userId: req.params.userId, brewId: req.params.brewId },
      { rating: req.body.rating, updatedAt: Date.now() },
      {
        new: true,
      }
    );
    res.send(rating);
  } catch (e) {
    return res.json(e.message);
  }
};

// Find average rating
const avgRating = async (req, res) => {
  try {
    const rating = await Rating
      .find({
        brewId: req.params.brewId,
      })
      .select("rating");
    return res.json(rating);
  } catch (e) {
    return res.json(e.message);
  }
};

module.exports = {
  postRating, 
  findYourRatings,
  findAllYourRatings,
  updateRating,
  avgRating,
};
