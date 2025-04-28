const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    roles: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("user", userSchema)

