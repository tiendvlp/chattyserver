const db = require('../../data/mongodb/ConnectMongodb')
const Joi = require('joi')
const validator = require('../../common/validator/validator')
const { valid } = require('joi')
const mongodb = require('mongodb')

module.exports = function (req, res, next) {
    if (!req.account) {return res.status(400).json({message: "invalid account"})}
    req.body.senderEmail = req.account.email
    let {error} = validator(createMessageSchema())(req.body)
    if (error) {return res.status(400).json({message: "invalid request"})}
    checkChannelId(req.body.channelId, req.body.senderEmail ,function (result) {
        if (!result) {return res.status(400).json({message: "channel does not exist, or you are not a member in that channel"})}
        return next()
    })

}

function createMessageSchema () {
    return Joi.object().keys({
        senderEmail: Joi.string().email().required().error(() => {return new Error ("sender email is missing or invalid")}),
        channelId : Joi.string().required().error(() => {return new Error("ChannelId is missing")}),
        body: Joi.string().required().error(() => {return new Error("Body message is missing")})
    })
}

function checkChannelId (channelId,senderEmail,callback) {
    let normalize = {
        members : 1
    }
    db.get().collection("Channel").findOne({_id: new mongodb.ObjectID(channelId)}, function (err, result) {
        if (err) return callback(false)
        if (!result) return callback(false)
        let isExist = false
        result.members.forEach(member => {
            if (member.email === senderEmail) {
                isExist = true
            }
        });
        if (!isExist) return callback(false)
        console.log("send message req validate: " + isExist)
        return callback(true)
    })
}