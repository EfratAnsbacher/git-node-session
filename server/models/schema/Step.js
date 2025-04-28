const mongoose = require("mongoose")
const stepSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    comments: String,
    _id: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})
module.exports = stepSchema