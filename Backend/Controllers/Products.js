const formater = require("mysql").format

const {format} = require("mysql")
const productEntity = require("../models/ProductEntity")
const getAllProducts = require("../services/generalGet")

const ProductController = {}

ProductController.list = async (req, res) => {
	const query = "SELECT * FROM Product"

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
	const queryProcessed = format(queryUnprocessed, [
		Name,
		Description,
		State,
		LaboratoryName,
	])

	req.getConnection((err, conn) => {
		conn.query(queryProcessed, (error, results) => {
			if (error) {
				res.json(error)
				return
			}
			res.status(201).json({})
		})
	})
}

ProductController.getOne = async (req, res) => {
	const queryUnprocessed = "SELECT * FROM Product WHERE IDCode=?"
	const IDCode = req.params.id
	const queryProcessed = format(queryUnprocessed, [IDCode])
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
	const queryProcessed = format(queryUnprocessed, [IDCode])
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
	const queryUnprocessed = `INSERT INTO Product(Name,Description,State,LaboratoryName) VALUES(?,?,?,?);`
	const {Name, Description, State, LaboratoryName} = req.body
	const queryProcessed = format(queryUnprocessed, [
		Name,
		Description,
		State,
		LaboratoryName,
	])

	req.getConnection((err, conn) => {
		conn.query(queryProcessed, (error, results) => {
			if (error) {
				res.json(error)
				return
			}
			res.status(201).json({})
		})
	})
}

module.exports = ProductController
