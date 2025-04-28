const express = require("express")
const verifyJWT = require("../middleware/verifyJWT")
const productController = require("../controllers/productController")

const router = express.Router()

router.post("/",verifyJWT, productController.createNewProduct)
router.get("/", productController.getAllProducts)
router.get("/:id", productController.getProductById)
router.put("/:id",verifyJWT,productController.updateProduct)
router.delete("/:id",verifyJWT,productController.deleteProduct)
// router.put("/step", productController.addStep)  

module.exports = router