const db = require('../../data/mongodb/ConnectMongodb')
const mongodb = require('mongodb')

module.exports = function (req, res, next) {
    if (!req.body.channelId) {return res.status(404).json({message: "invalid request"})}
    checkChannel(req.body.channelId, req.account.email, function (result) {
        if (!result) {return res.status(400).json({message: "invalid request"})}
        return next()
    })
}

function checkChannel (channelId,senderEmail,callback) {
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
