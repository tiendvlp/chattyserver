const Joi = require('joi')

module.exports = Joi.object().keys({
    id : Joi.string().required().error (() => 'message must have id'),
    senderEmail : Joi.string().email().required().error (() => Error('message must have email of sender (senderId)')),
    channelId : Joi.string().required().error (() => Error('message must have id')),
    createdDate : Joi.date().timestamp().required().error (() => Error('message must have createdDate (millisec)')),
    type: Joi.string().required().error(() => Error('Message type is missing')),
    content : Joi.required().error (() => Error('message must have content'))
})