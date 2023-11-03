const productRoutes = require("./routes/ProductRoute")
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
		password: "jho014%",
		database: "InventarioMedPro",
	})
)

app.use("/products", productRoutes)
app.listen(8080, () => {
	console.log("server running sucessfully")
})

// })

// connection.query("SELECT * FROM Product", (error, results, fields) => {
// 	if (error) {
// 		console.log("error en la consulta", error)
// 		return
// 	}

// 	console.log(results, "son los resultados")
// })
