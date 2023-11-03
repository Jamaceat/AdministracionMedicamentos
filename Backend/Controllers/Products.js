const controller = {}

controller.list = (req, res) => {
	console.log("Llega aqui")
	req.getConnection((err, conn) => {
		conn.query("SELECT * FROM Product", (error, results) => {
			if (error) {
				res.json(error)
				return
			}
			res.status(200).json(results)
		})
	})
}

module.exports = controller
