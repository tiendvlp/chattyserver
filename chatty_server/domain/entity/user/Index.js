const userEntityValidatorSchema = require('./UserEntityValidatorSchema')
const entityValidator = require ('../../../common/validator/validator') (userEntityValidatorSchema)
const userEntityFactory = require('./UserEntityFactory') (entityValidator)

module.exports = userEntityFactory