const Joi = require('joi')

module.exports = Joi.object().keys({
    id : Joi.string().required().error(() => {return Error('Channel id must be defined')}),
    title : Joi.string().required().error(() => {return Error('Channel title must be defined')}),
    memberIds : Joi.array().items(Joi.string().required(), Joi.string().required()).required().error(() => {return Error('Channel must include at least 2 member')})
})