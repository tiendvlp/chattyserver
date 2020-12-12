const Joi = require('joi')

module.exports = Joi.object().keys({
    id : Joi.string().required().error(() => {return Error('Channel id must be defined')}),
    title : Joi.string().required().error(() => {return Error('Channel title must be defined')}),
    admin : Joi.string().email().required().error(() => {return Error('Channel admin email must be defined')}),
    status : Joi.object().keys ({
        senderEmail: Joi.string().required().error(() => {return Error("Sender email is missing")}),
        description: Joi.object().keys({
            type: Joi.string().required().error (() => {return Error("Description type is missing")}),
            content: Joi.required().error (() => {return Error ("Description content is missing")})
        })
    }),
    members : Joi.array().items(Joi.object().keys ({
        id : Joi.string().required().error(() => {return Error("Member id is missing")}),
        email : Joi.string().required().error(() => {return Error("Member_email is missing")}),
        name : Joi.string().required().error(() => {return Error("Member_name is missing")}),
        avatar: Joi.object().keys({
            type: Joi.string().required().error(() => {return  Error("Channel avatar type is missing")}),
            content: Joi.required().error(() => {return Error("Channel avatar content is missing")})
        }).required().error(() => {return Error("channel avatar is missing")})
    })),
    seen : Joi.array().items(Joi.string().email()).min(1).required().error(() => {return Error("Channel seen must have at least 1")}),
    createdDate : Joi.date().timestamp().required().error (() => Error('channel must have createdDate (millisec)')),
    latestUpdate : Joi.date().timestamp().required().error (() => Error('channel must have latestUpdate (millisec)')),
})