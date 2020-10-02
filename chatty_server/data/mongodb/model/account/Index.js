const AccountDocumentValidatorSchema = require('./AccountDocumentValidatorSchema')
const validator = require('../../../../common/validator/validator') (AccountDocumentValidatorSchema)
const accountDocumentFactory = require('./AccountDocument') (validator)

module.exports = accountDocumentFactory