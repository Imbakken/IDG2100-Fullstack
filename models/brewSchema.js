const mongoose = require("mongoose");

const brewSchema = new mongoose.Schema({
    brewName: {
        type: String,
        required: true, 
    },
    coffeeName: { 
        type: String, 
        required: true,
    },
    grind: { 
        type: Number,  
        required: true,
        min: 1, 
        max: 7,
    },
    water: { 
        type: Number,   
        enum: [0.5, 1.1, 2.2],
        required: true,
    },
    gram: { 
        type: Number, 
    },
    coffeeLeft: {
        type: Number,
    },
    User: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Brew", brewSchema);
