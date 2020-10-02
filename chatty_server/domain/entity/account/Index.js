const accountEntityValidatorSchema = require('./AccountEntityValidatorSchema')
const validator = require('../../../common/validator/validator') (accountEntityValidatorSchema)
const accountEntity = require('./AccountEntity') 

module.exports = accountEntity(validator)