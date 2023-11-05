const productRoutes = require("./routes/ProductRoute")
const providerRoutes = require("./routes/ProviderRoute")
const receptionRoutes = require("./routes/ReceptionRoute")

const credentials = require("dotenv").config()
const mysql = require("mysql")
const express = require("express")
const app = express()
const myconnection = require("express-myconnection")
const router = express.Router()

app.use(express.json(50))

app.use(
	myconnection(mysql, {
		host: "localhost",
		user: "root",
		password: process.env.PASSWORD,
		database: "InventarioMedPro",
	})
)

app.use("/products", productRoutes)
app.use("/providers", providerRoutes)
app.use("/receptions", receptionRoutes)

app.listen(8080, () => {
	console.log("server running sucessfully")
})
