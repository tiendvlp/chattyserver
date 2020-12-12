const channelEntityValidatorSchema = require('./ChannelEntityValidatorSchema')
const entityValidator = require('../../../common/validator/validator') (channelEntityValidatorSchema)
const channelEntityFactory = require('./ChannelEntity') 

module.exports = channelEntityFactory(entityValidator)