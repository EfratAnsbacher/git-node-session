const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    }
    catch (err) {
        console.log("connection to db failed")
    }
}

module.exports = { connectDB }