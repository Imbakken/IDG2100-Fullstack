const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    brewId: { 
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5, 6],
    },
    brewName: { 
        type: String, 
        required: true,
    },
    grind: { 
        type: Number,    
    },
    water: { 
        type: Number,     
    },
    gram: { 
        type: Number, 
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

module.exports = mongoose.model("Rating", ratingSchema);
