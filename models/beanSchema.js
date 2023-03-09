const mongoose = require("mongoose");

const beanSchema = new mongoose.Schema(
    {
    name: { 
        type: String, 
        required: true 
    },
    brand: { 
        type: String, 
        required: true 
    },
    roastProfile: { 
        type: Number, 
        required: true,
        enum: [1, 2, 3, 4],
    },
    price: { 
        type: Number, 
        required: true 
    },
    country: { 
        type: String, 
        required: true 
    },
    beanType: { 
        type: [String], 
        required: true 
    },
    metersAboveSeaLevel: { 
        type: Number, 
        required: true 
    },
    aroma: { 
        type: [String],
        required: true 
    },
    },  
    { collection: "beans" }
);

module.exports = mongoose.model("Bean", beanSchema);