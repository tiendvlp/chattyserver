const Joi = require('joi')

module.exports = Joi.object().keys({
    id : Joi.string().required().error (() => 'story must have id'),
    owner : Joi.string().email().required().error (() => Error('story must have email of owner (ownerEmail)')),
    channelId : Joi.string().required().error (() => Error('story must have id')),
    uploadedDate : Joi.date().timestamp().required().error (() => Error('story must have uploadedDate (millisec)')),
    outdatedDate : Joi.date().timestamp().required().error (() => Error('story must have outdatedDate (millisec)')),
    type: Joi.string().required().error(() => Error('story type is missing')),
    content : Joi.required().error (() => Error('story must have content'))
})