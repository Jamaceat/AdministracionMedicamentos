const receptionEntity = {}

receptionEntity.dbname = "ReceptionProductByProvider"

receptionEntity.model = [
	"InvoiceID",
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

module.exports = receptionEntity
