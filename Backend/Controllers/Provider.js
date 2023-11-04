const formater = require("mysql").format
const reductorVerifier = require("../Utils/FieldVerifier")
const verifier = require("../Utils/FieldVerifier")

const ProviderController = {}

ProviderController.list = async (req, res) => {
	const query =
		"SELECT IDType, ID, Name, Address, ContactName, ContactNumber FROM Provider"

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

ProviderController.create = async (req, res) => {
	const queryUnprocessed = `INSERT INTO Provider(IDType, ID, Name, Address, ContactName, ContactNumber) VALUES(?,?,?,?,?,?);`
	const {IDType, ID, Name, Address, ContactName, ContactNumber} = req.body
	const valid = [IDType, ID, Name, Address, ContactName, ContactNumber].reduce(
		verifier,
		false
	)
	console.log("Is valid :", valid)
	const queryProcessed = formater(queryUnprocessed, [
		IDType,
		ID,
		Name,
		Address,
		ContactName,
		ContactNumber,
	])

	if (valid) {
		req.getConnection((err, conn) => {
			conn.query(queryProcessed, (error, results) => {
				if (error) {
					res.status(400).json(error)
					return
				}
				res.status(201).json({})
			})
		})
	} else {
		res.status(400).json({message: "need all fields"})
	}
}

ProviderController.getOne = async (req, res) => {
	const queryUnprocessed =
		"SELECT IDType, ID, Name, Address, ContactName, ContactNumber FROM Provider WHERE IDType=? and ID=?"
	const {IDType, ID} = req.body
	const valid = [IDType, ID].reduce(verifier, false)
	const queryProcessed = formater(queryUnprocessed, [IDType, ID])
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

ProviderController.delete = async (req, res) => {
	const queryUnprocessed = `DELETE FROM Provider WHERE IDType=? and ID=?`
	const {IDType, ID} = req.body
	const valid = [IDType, ID].reduce(verifier, false)
	const queryProcessed = formater(queryUnprocessed, [IDType, ID])

	if (valid) {
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
	} else {
		res.status(400).json({message: "bad request, need all identifiers"})
	}
}

ProviderController.update = async (req, res) => {
	const queryUnprocessed = `UPDATE Provider SET`
	const {IDType, ID, Name, Address, ContactName, ContactNumber} = req.body
	const valid = [IDType, ID, Name, Address, ContactName, ContactNumber].reduce(
		verifier,
		false
	)

	if (valid) {
		const index = ["Name", "Address", "ContactName", "ContactNumber"]
		const queryHandler =
			queryUnprocessed +
			[Name, Address, ContactName, ContactNumber].reduce(
				(acumulado, x, i) =>
					x
						? (acumulado += `${acumulado ? "," : ""} \`${index[i]}\` = '${x}'`)
						: acumulado,
				""
			) +
			" WHERE IDType=? and ID=?"

		const queryProcessed = formater(queryHandler, [IDType, ID])
		console.log(queryHandler)

		req.getConnection((err, conn) => {
			conn.query(queryProcessed, (error, results) => {
				if (error) {
					res.json(error)
					return
				}
				const affectedRows = results.affectedRows
				if (affectedRows === 0) {
					res.status(400).json({message: "bad request, ID doesn't exits"})
				} else {
					res.status(201).json({affectedRows})
				}
			})
		})
	} else {
		res.status(400).json({message: "invalid fields"})
	}
}

module.exports = ProviderController
