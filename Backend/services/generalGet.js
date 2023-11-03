const formater = require("mysql")

const anyEntityListStatement = "SELECT * FROM "

//Query
const getEntityList = (entity) => {
	return formater.format(anyEntityListStatement, [entity])
}

module.exports = getEntityList
