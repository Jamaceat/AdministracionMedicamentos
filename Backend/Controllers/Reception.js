const formater = require("mysql").format

const verifier = require("../Utils/FieldVerifier")

const ReceptionController = {}

ReceptionController.list = async (req, res) => {
	const query =
		"SELECT InvoiceID, IDProduct, IDProvider, IDTypeProvider, ReceptionDateTime, Quantity, Batch, INVIMACode, ExpirationDate, Description FROM ReceptionProductByProvider"

	console.log("llegue al lugar correcto")
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

ReceptionController.create = async (req, res) => {
	const queryUnprocessed = `INSERT INTO ReceptionProductByProvider( IDProduct, IDProvider, IDTypeProvider, ReceptionDateTime, Quantity, Batch, INVIMACode, ExpirationDate, Description)
     VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);`
	const {
		IDProduct,
		IDProvider,
		IDTypeProvider,
		ReceptionDateTime,
		Quantity,
		Batch,
		INVIMACode,
		ExpirationDate,
		Description,
	} = req.body
	const valid = [
		IDProduct,
		IDProvider,
		IDTypeProvider,
		ReceptionDateTime,
		Quantity,
		Batch,
		INVIMACode,
		ExpirationDate,
		Description,
	].reduce(verifier, false)

	const queryProcessed = formater(queryUnprocessed, [
		IDProduct,
		IDProvider,
		IDTypeProvider,
		ReceptionDateTime,
		Quantity,
		Batch,
		INVIMACode,
		ExpirationDate,
		Description,
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

ReceptionController.getOne = async (req, res) => {
	const queryUnprocessed =
		"SELECT InvoiceID, IDProduct, IDProvider, IDTypeProvider, ReceptionDateTime, Quantity, Batch, INVIMACode, ExpirationDate, Description FROM ReceptionProductByProvider WHERE InvoiceID=?"
	const InvoiceID = req.params.id
	const valid = [InvoiceID].reduce(verifier, false)
	const queryProcessed = formater(queryUnprocessed, [InvoiceID])
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

ReceptionController.delete = async (req, res) => {
	const queryUnprocessed = `DELETE FROM ReceptionProductByProvider WHERE InvoiceID=?`
	const InvoiceID = req.params.id
	const valid = [InvoiceID].reduce(verifier, false)
	const queryProcessed = formater(queryUnprocessed, [InvoiceID])

	if (valid) {
		req.getConnection((err, conn) => {
			conn.query(queryProcessed, (error, results) => {
				if (error) {
					res.json(error)
					return
				}

				const affectedRows = results.affectedRows
				if (results.affectedRows === 0) {
					res.status(404).json({message: "Not entity found with that id"})
				} else {
					res.status(204).json({message: "deleted sucessfully"})
				}
			})
		})
	} else {
		res.status(400).json({message: "bad request, need all identifiers"})
	}
}

ReceptionController.update = async (req, res) => {
	const queryUnprocessed = `UPDATE ReceptionProductByProvider SET`
	const {
		InvoiceID,
		IDProduct,
		IDProvider,
		IDTypeProvider,
		ReceptionDateTime,
		Quantity,
		Batch,
		INVIMACode,
		ExpirationDate,
		Description,
	} = req.body
	const valid = [
		InvoiceID,
		IDProduct,
		IDProvider,
		IDTypeProvider,
		ReceptionDateTime,
		Quantity,
		Batch,
		INVIMACode,
		ExpirationDate,
		Description,
	].reduce(verifier, false)

	if (valid) {
		const index = [
			"IDProduct",
			"IDProvider",
			"IDTypeProvider",
			"ReceptionDateTime",
			"Quantity",
			"Batch",
			"INVIMACode",
			"ExpirationDate",
			"Description",
		]
		const queryHandler =
			queryUnprocessed +
			[
				IDProduct,
				IDProvider,
				IDTypeProvider,
				ReceptionDateTime,
				Quantity,
				Batch,
				INVIMACode,
				ExpirationDate,
				Description,
			].reduce(
				(acumulado, x, i) =>
					x
						? (acumulado += `${acumulado ? "," : ""} \`${index[i]}\` = '${x}'`)
						: acumulado,
				""
			) +
			" WHERE InvoiceID=?"

		const queryProcessed = formater(queryHandler, [InvoiceID])
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

module.exports = ReceptionController
