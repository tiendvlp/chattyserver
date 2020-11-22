const validator = require('../../common/validator/validator')
const Joi = require ('joi')
const db = require('../../data/mongodb/ConnectMongodb')

module.exports = function (req, res, next) {
    if (!req.account) {return res.status(400).json({message: "UNAUTHORIZATION"})}
    // to make sure the access token match the request
    req.body.channelData.adminEmail = req.account.email
    let {error} = validator(getSchema())(req.body)
    if (error) return res.status(400).json({message: "Invalid request"})
    var memberEmails = req.body.channelData.memberEmails
    memberEmails.push(req.account.email)
    validateMember(memberEmails, function (result) {
        if (result) return next()
        return res.status(400).json({message : "Invalid memberIds"})
    })
}

function getSchema () {
    return Joi.object().keys({
        channelData : Joi.object().keys({
            adminEmail: Joi.string().email().required().error((err) => {return new Error ("AdminId is missing or invalid")}),
            memberEmails: Joi.array().items(Joi.string().email()).min(2).required().error( () => {return new Error("MemberIds have to have at least 2 members")}),
        }),
        firstMessage : Joi.object().keys({
            body: Joi.string().required().error(() => {return new Error("First message is required")})
        })
    })
}

function validateMember (memberEmails, callback) {
    let query = {email : {$in : memberEmails}}
    let normalize = {
        _id : 1,
    }

    db.get().collection("User").find(query, normalize).toArray(function(err, result) {
        if (err) return callback(false)
        if (!result) return callback(false)
        return callback(true) 
    })
}

