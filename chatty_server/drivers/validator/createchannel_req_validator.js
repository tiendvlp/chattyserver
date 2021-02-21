const validator = require('../../common/validator/validator')
const Joi = require ('joi')
const db = require('../../data/mongodb/ConnectMongodb')

module.exports = function (req, res, next) {
    if (!req.account) {return res.status(400).json({message: "UNAUTHORIZATION"})}
    // to make sure the access token match the request
    req.body.channelData.adminEmail = req.account.email
    console.log("nhu cc lun"); 
    var memberEmails = req.body.channelData.memberEmails
    validateMember(memberEmails, function (result) {
        if (result) return next()
        return res.status(400).json({message : "Invalid memberIds"})
    })
}

function getSchema () {
    return Joi.object().keys({
        channelData : Joi.object().keys({
            memberEmails: Joi.array().items(Joi.string().email()).min(1).required().error( () => { console.log("nhu cc lun"); return new Error("MemberIds have to have at least 2 members")}),
        }),
        firstMessage : Joi.object().keys({
            body: Joi.string().required().error(() => {console.log("nhu cc lun");return new Error("First message is required")})
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

