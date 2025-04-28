const express = require("express")
const verifyJWT = require("../middleware/verifyJWT")
const cartController = require("../controllers/cartController")

const router = express.Router()

router.use(verifyJWT)

router.post("/", cartController.createNewCart)
router.get("/", cartController.getAllCarts)
router.get("/:id", cartController.getCartById)
router.delete("/:id", cartController.deleteCart)

module.exports = router
