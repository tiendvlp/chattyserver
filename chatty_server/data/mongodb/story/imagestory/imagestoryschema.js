const Joi = require('joi')

module.exports = Joi.object().keys({
    owner: Joi.string().email().required().error(() => {return new Error("Owner (email) is required")}),
    type: Joi.string().valid("image/png", "image/jpg").required().error(() => {return new Error("Story_type have to be image/png or image/jpg")}),
    content: Joi.string().required().error(() => {return new Error("content of an image_story have to be filename of story")}),
    uploadedDate: Joi.date().timestamp().required().error(() => {return new Error("uploadedDate is missing")}),
    channelId : Joi.string().required().error(() => {return new Error("channelId is missing")}),
    outDated: Joi.boolean().required().error(() => {return new Error("outDated is missing")}) 
})