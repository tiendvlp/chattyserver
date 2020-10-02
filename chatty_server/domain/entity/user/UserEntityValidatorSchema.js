var Joi = require('joi')

module.exports = Joi.object ().keys ({
    id : Joi.string().required().error(() => {return Error('UserEntityError: id is required')}),
    email : Joi.string().email().required().error(() => {return Error('UserEntityError: id is required')}),
    name : Joi.string().required().error(() => {return Error('UserEntityError : name is required')}),
    avatarName : Joi.string().required().error (() => Error('message must have senderInfo.avatarName (string)')),
    avatarColor : Joi.array().items(Joi.number().less(1).greater(0).required(),Joi.number().less(1).greater(0).required(),Joi.number().less(1).greater(0).required()).length(3).required(),
    channelIds : Joi.array().items(Joi.string().required()).required().error(() => {return Error('Channel must include at least 2 member')})
})