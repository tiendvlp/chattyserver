const Joi = require('joi')

module.exports = Joi.object().keys({
    id : Joi.string().required().error (() => 'message must have id'),
    senderId : Joi.string().required().error (() => Error('message must have id of sender (senderId)')),
    channelId : Joi.string().required().error (() => Error('message must have id')),
    sent : Joi.date().required().error (() => Error('message must have sent (date)')),
    messageBody : Joi.string().required().error (() => Error('message must have messageBody (string)')),
    senderInfo : Joi.object().keys({
            name : Joi.string().required().error (() => Error('message must have senderInfo.name (string)')),
            avatarName : Joi.string().required().error (() => Error('message must have senderInfo.avatarName (string)')),
            avatarColor : Joi.array().items(Joi.number().less(1).greater(0).required(),Joi.number().less(1).greater(0).required(),Joi.number().less(1).greater(0).required()).length(3).required()
            .error(() => Error('avatarColor is required'))
    })
})