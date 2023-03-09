const Brew = require("../models/brewSchema");

// Create a new brew
const registerBrew = (request, response) => {
  const newBrew = new Brew({
    brewName: request.body.brewName,
    coffeeName: request.body.coffeeName,
    grind: request.body.grind,
    water: request.body.water,
    gram: request.body.gram,
    coffeeLeft: request.body.water,
    User: request.body.User,
  });
  newBrew
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      console.log(error.message);
      response.json(error);
    });
};

// Get the latest brew added
const getBrew = (request, response) => {
  try {
    Brew
      .find()
      .sort({ updatedAt: -1 })
      .limit(1)
      .then((data) => response.json(data));
  } catch (error) {
    response.json({ message: error });
  }
};

// Get all brews
const getAllBrews = (request, response) => {
  try {
    Brew
      .find()
      .sort({ createdAt: -1 })
      .then((data) => response.json(data));
  } catch (error) {
    response.json({ message: error });
  }
};

// Check if brew exists
const checkBrew = async (req, res) => {
  try {
    const brew = await Brew.find({
      $and: [
        { brewName: req.body.brewName },
        { coffeeName: req.body.coffeeName },
        { grind: req.body.grind },
        { water: req.body.water },
        { gram: req.body.gram },
      ],
    });
    return res.json(brew);
  } catch (error) {
    res.json({ message: error });
  }
};

// Find a brew and update it 
const existingBrew = async (req, res) => {
  try {
    const _id = req.params;
    const brew = await Brew.findByIdAndUpdate(
      _id,
      { coffeeLeft: req.body.water, updatedAt: Date.now() },
      {
        new: true,
      }
    );
    res.send(brew);
  } catch (error) {
    res.json({ message: error });
  }
};

// Find a brew and update it by reducing coffeLeft in the database
const takeBrew = async (req, res) => {
  try {
    const _id = req.params;
    const make = await Brew.findOneAndUpdate(
      {
        _id,
      },
      { $inc: { coffeeLeft: -0.25 } },
      {
        new: true,
      }
    );
    res.send(make);
  } catch (error) {
    res.json({ message: error });
  }
};

// Delete a brew
const deleteBrew = async (request, response) => {
  try {
    await Brew.remove({ _id: request.params._id });
  } catch (error) {
    response.json({ message: error });
  }
};

module.exports = {
  registerBrew,
  getBrew,
  getAllBrews,
  checkBrew,
  takeBrew,
  existingBrew,
  deleteBrew,
};
