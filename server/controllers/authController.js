const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User");

const login = async (req, res) => {
    const { userName, password } = req.body

    //validation
    if (!userName || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    //check if exist
    const foundedUser = await User.findOne({ userName: userName }).lean()
    if (!foundedUser || !foundedUser.active) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const match = await bcrypt.compare(password, foundedUser.password)

    if (!match) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const userInfo = {
        _id: foundedUser._id,
        name: foundedUser.name,
        userName: foundedUser.userName,
        roles: foundedUser.roles,
        email: foundedUser.email
    }

    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)

    res.json({ accessToken });
}

const register = async (req, res) => {
    const { userName, name, password, phone, email } = req.body
    //validation
    if (!userName || !name || !password || !phone || !email) {
        return res.status(400).json({ message: "All fields are required" })
    }

    //check for duplicate
    const duplicateUser = await User.findOne({ userName: userName }).lean()
    if (duplicateUser) {
        return res.status(409).json({ message: "Duplicate user" })
    }

    const hashPassword = await bcrypt.hash(password, 10)


    const user = User.create({ userName, name, password:hashPassword, phone, email })
    if (!user) {
        return res.status(400).json({ message: "Bad request" })
    }

    res.json({ message: `User ${name} created` })
}


module.exports = { login, register }