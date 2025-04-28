const Product = require("../models/Product")
const createNewProduct = async (req, res) => {
    const {name, barcode, price, picture, information } = req.body
    const product = await Product.create({name, barcode, price, picture, information })
    res.json("New product created")
}

const getAllProducts = async (req, res) => {

    const products = await Product.find().lean()
    // if(!products){
    //     return res.status(400).json({message: "Bad request"})
    // }
    res.json(products)
}

const getProductById = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id).lean()
    if (!product) {
        return res.status(200).send(`not found product with the id ${id}`)
    }
    res.json(product)
}

const updateProduct = async (req, res) => {

    const {name, barcode, price, picture, information } = req.body
    const { id } = req.params
    const product = await Product.findById(id)
    product.name = name
    product.barcode = barcode
    product.price = price
    product.picture = picture
    product.information = information
    const updateProduct = await product.save()
    res.status(200).send("update product complete")
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    const deleted = await product.deleteOne(product)
    res.send("product deleted successfuly")
}

// const addStep = async (req, res) =>{
//     const {productId,title,comments,_id} = req.body
//     const product = await Product.findById(productId)
//     if (!product) {
//         return res.json({message:`product '${id}' not found`})
//     }
//     product.steps = [...product.steps,{title,comments}]
//     const updatedSteps = await product.save()
//     res.json(updatedSteps)
//     }

module.exports = { createNewProduct, getAllProducts, getProductById, updateProduct, deleteProduct }