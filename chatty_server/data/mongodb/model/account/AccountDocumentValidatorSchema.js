const Joi = require ('joi')

module.exports = Joi.object().keys({
    email : Joi.string().email().required().error(() => {return new Error("Your email is missing or invalid")}),
    password : Joi.string().required().error(() => {return new Error("Your password is missing or invalid")}),
    dateInMillisecond : Joi.date().required().error (() => {return new Error ("Your account_created_date is missing or invalid")}),
    isEmailVerified : Joi.boolean().required().error(() => {return new Error("Your isEmailVerified is missing or invalid")})
})