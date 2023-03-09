const Bean = require("../models/beanSchema");

// Create bean
const createBean = async (req, res) => {
  try {
    const bean = await Bean.create({
      name: req.body.name,
      brand: req.body.brand,
      roastProfile: req.body.roastProfile,
      price: req.body.price,
      country: req.body.country,
      beanType: req.body.beanType,
      metersAboveSeaLevel: req.body.metersAboveSeaLevel,
      aroma: req.body.aroma,
    });
      res.status(201).json(bean);
  } catch (error) {
      console.log(error.message);
      res.status(400).json(error.message);
  }
};

// Find beans
const readBeans = async (req, res) => {
  try {
    const bean = await Bean.find();
    res.json(bean);
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
};

// Find bean by name
const findBeanByName = async (req, res) => {
  try {
    const bean = await Bean.find({ name: req.params.id });
    if (bean.length !== 0) {
      res.json(bean);
    } else {
      res.status(404);
      throw new Error("Name not found");
    }
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
};

// Update a bean
const updateBean = async (req, res) => {
  try {
    const bean = await Bean.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        brand: req.body.brand,
        roastProfile: req.body.roastProfile,
        price: req.body.price,
        country: req.body.country,
        beanType: req.body.beanType,
        metersAboveSeaLevel: req.body.metersAboveSeaLevel,
        aroma: req.body.aroma,
      }
    );
    res.json(bean);
  } catch (error) {
    console.log(error.message);
    res.status(404).json("Id not found");
  }
};

// Delete bean 
const deleteBean = async (req, res) => {
  try {
    const bean = await Bean.findOne({ _id: req.params.id });
    await bean.delete();
    res.json(bean);
  } catch (error) {
    console.log(error.message);
    res.status(404).json("Id not found");
  }
};

module.exports = {
  createBean,
  readBeans,
  updateBean,
  deleteBean,
  findBeanByName,
};
