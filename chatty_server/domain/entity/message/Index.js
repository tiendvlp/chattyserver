const messageEntityFactory = require('./MessageEntity')
const messageEntityValidatorSchemma = require ('./MessageEntityValidatorSchema')
const entityValidator = require('../../../common/validator/validator') (messageEntityValidatorSchemma)
module.exports = messageEntityFactory(entityValidator)