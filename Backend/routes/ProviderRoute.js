const providerController = require("../Controllers/Provider")
const providerRoutes = require("express").Router()

providerRoutes.get("/", providerController.list)
providerRoutes.get("/only", providerController.getOne)

providerRoutes.delete("/", providerController.delete)

providerRoutes.post("/", providerController.create)

providerRoutes.put("/", providerController.update)

module.exports = providerRoutes
