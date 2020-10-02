const messageEntityFactory = require('./MessageEntity')
const messageEntityValidatorSchemma = require ('./MessageEntityValidatorSchema')
const entityValidator = require('../validator/EntityValidator') (messageEntityValidatorSchemma)
module.exports = messageEntityFactory(entityValidator)