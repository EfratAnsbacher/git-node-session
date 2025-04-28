require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const { connectDB } = require("./config/connectDB")
const { default: mongoose } = require("mongoose")
const PORT = process.env.PORT || 6000
const app = express()

//middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

connectDB()

//routes
app.get("/", (req, res) => {
    res.send("this is the home page")
})

app.use("/api/products", require("./routes/productRoute"))
app.use("/api/auth", require("./routes/authRoute"))
app.use("/api/carts", require("./routes/cartRoute"))


console.log(process.env.NODE_ENV)

//run
mongoose.connection.once('open', () => {
    console.log('connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })
})

mongoose.connection.on('error', err => {
    console.log(err)
})
