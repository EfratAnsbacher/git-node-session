const mongoose = require("mongoose")
const stepSchema = require("./schema/Step")
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    barcode: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        trim: true,
        lowercase: true
    },
    information: {
        type: String,
        trim: true,
        lowercase: true
    }
    //,
    // steps:[stepSchema],
}, {
    timestamps: true
})
module.exports = mongoose.model("Product", productSchema)