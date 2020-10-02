const channelEntityValidatorSchema = require('./ChannelEntityValidatorSchema')
const entityValidator = require('../validator/EntityValidator') (channelEntityValidatorSchema)
const channelEntityFactory = require('./ChannelEntity') 

module.exports = channelEntityFactory(entityValidator)