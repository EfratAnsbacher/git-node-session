const Cart = require("../models/Cart")
const createNewCart = async (req, res) => {
    const user=req.user._id
    const { product } = req.body
    const cart = await Cart.create({ product, user })
    res.json("New cart created")
}

const getAllCarts = async (req, res) => {
    const carts = await Cart.find({ user: req.user._id }).populate('product')
    // if(!carts){
    //     return res.status(400).json({message: "Bad request"})
    // }
    res.json(carts)
}

const getCartById = async (req, res) => {
    const { cartId } = req.params
    const cart = await Cart.findOne({ _id: id, user: req.user._id })
    if (!cart) {
        return res.send(`not found cart with the id ${cartId}`)
    }
    res.json(cart)
}

const deleteCart = async (req, res) => {
    const { id } = req.params
    const cart = await Cart.findById(id)
    const deleted = await Cart.deleteOne(cart)
    res.send("cart deleted successfuly")
}
module.exports = { createNewCart, getAllCarts, getCartById, deleteCart }