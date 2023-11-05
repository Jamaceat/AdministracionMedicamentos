const formater = require("mysql").format
const verifier = require("../Utils/FieldVerifier")
const ProductController = {}

const possibleState = ["Activo", "Inactivo"]

ProductController.list = async (req, res) => {
	const query =
		"SELECT IDCode, Name, Description, State, LaboratoryName FROM Product"

	req.getConnection((err, conn) => {
		conn.query(query, (error, results) => {
			if (error) {
				res.json(error)
				return
			}
			res.status(200).json(results)
		})
	})
}

ProductController.create = async (req, res) => {
	const queryUnprocessed = `INSERT INTO Product(Name,Description,State,LaboratoryName) VALUES(?,?,?,?);`
	const {Name, Description, State, LaboratoryName} = req.body
	const queryProcessed = formater(queryUnprocessed, [
		Name,
		Description,
		State,
		LaboratoryName,
	])
	let valid = [Name, Description, State, LaboratoryName].reduce(verifier, false)
	valid = possibleState.reduce(
		(isValid, x) => (State === x ? true : isValid),
		false
	)

	if (valid) {
		req.getConnection((err, conn) => {
			conn.query(queryProcessed, (error, results) => {
				if (error) {
					res.json(error)
					return
				}
				res.status(201).json({})
			})
		})
	} else {
		res.status(400).json({message: "invalid request"})
	}
}

ProductController.getOne = async (req, res) => {
	const queryUnprocessed =
		"SELECT IDCode, Name, Description, State, LaboratoryName FROM Product WHERE IDCode=?"
	const IDCode = req.params.id
	const queryProcessed = formater(queryUnprocessed, [IDCode])
	req.getConnection((err, conn) => {
		conn.query(queryProcessed, (error, results) => {
			if (error) {
				res.json(error)
				return
			}
			res.status(200).json(results[0])
		})
	})
}

ProductController.delete = async (req, res) => {
	const queryUnprocessed = `DELETE FROM Product WHERE IDCode=?`
	const IDCode = req.params.id
	const queryProcessed = formater(queryUnprocessed, [IDCode])
	req.getConnection((err, conn) => {
		conn.query(queryProcessed, (error, results) => {
			if (error) {
				res.json(error)
				return
			}
			if (results.affectedRows === 0) {
				res.status(404).json({message: "Not entity found with that id"})
			} else {
				res.status(204).json({message: results})
			}
		})
	})
}

ProductController.update = async (req, res) => {
	const queryUnprocessed = `UPDATE Product SET`
	const {IDCode, Name, Description, State, LaboratoryName} = req.body
	let valid = true
	if (State) {
		valid = possibleState.reduce(
			(isValid, x) => (State === x ? true : isValid),
			false
		)
	}
	if (valid) {
		const index = ["Name", "Description", "State", "LaboratoryName"]
		const queryHandler =
			queryUnprocessed +
			[Name, Description, State, LaboratoryName].reduce(
				(acumulado, x, i) =>
					x
						? (acumulado += `${acumulado ? "," : ""} \`${index[i]}\` = '${x}'`)
						: acumulado,
				""
			) +
			" WHERE IDCode=?"

		const queryProcessed = formater(queryHandler, [IDCode])

		req.getConnection((err, conn) => {
			conn.query(queryProcessed, (error, results) => {
				if (error) {
					res.json(error)
					return
				}
				const affectedRows = results.affectedRows
				if (affectedRows === 0) {
					res.status(400).json({message: "bad request, IDCode doesn't exits"})
				} else {
					res.status(201).json({affectedRows})
				}
			})
		})
	} else {
		res.status(400).json({message: "invalid request, bad status"})
	}
}

module.exports = ProductController
