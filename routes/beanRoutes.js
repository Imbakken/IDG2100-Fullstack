const express = require("express");
const router = express.Router();
const {
    createBean,
    readBeans,
    findBeanByName,
    updateBean,
    deleteBean,
} = require("../controllers/beanController");

// Create bean
router.post("/", createBean);

// Read beans
router.get("/", readBeans);

// Find bean by name
router.get("/:_id", findBeanByName);

// Update bean
router.put("/:_id", updateBean);

// Delete bean
router.delete("/:_id", deleteBean);

module.exports = router;
