const productController = require("../Controllers/Products")
const productRoutes = require("express").Router()

productRoutes.get("/", productController.list)
productRoutes.get("/:id", productController.getOne)

productRoutes.delete("/:id", productController.delete)

productRoutes.post("/", productController.create)

productRoutes.put("/", productController.update)

module.exports = productRoutes
