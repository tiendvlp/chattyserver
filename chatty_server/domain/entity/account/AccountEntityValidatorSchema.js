const Joi = require ('joi')

module.exports = Joi.object().keys({
    // id is not required because id only retrived from when query in db
    id : Joi.string().error(() => {return new Error("Your account is missing id")}),
    email : Joi.string().email().required().error(() => {return new Error("Your email is missing or invalid")}),
    password : Joi.string().required().error(() => {return new Error("Your password is missing or invalid")}),
    date : Joi.date().required().error (() => {return new Error ("Your account_created_date is missing or invalid")}),
    isEmailVerified : Joi.boolean().required().error(() => {return new Error("Your isEmailVerified is missing or invalid")})
})