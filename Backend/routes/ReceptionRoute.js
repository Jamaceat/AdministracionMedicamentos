const receptionController = require("../Controllers/Reception")
const receptionRoutes = require("express").Router()

receptionRoutes.get("/", receptionController.list)
receptionRoutes.get("/:id", receptionController.getOne)

receptionRoutes.delete("/:id", receptionController.delete)

receptionRoutes.post("/", receptionController.create)

receptionRoutes.put("/", receptionController.update)

module.exports = receptionRoutes
