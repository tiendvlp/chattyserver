const db = require('../../data/mongodb/ConnectMongodb')
const mongodb = require('mongodb')

module.exports = function (req, res, next) {
    let channelId = req.params.channelid
    return checkChannelId(channelId, req.account.email ,function (result) {
        if (!result) {return res.status(400).json({message: "channel does not exist, or you are not a member in that channel"})}
        req.message = {channelId : channelId}
        return next()
    })

}


function checkChannelId (channelId,senderEmail,callback) {
    return db.get().collection("Channel").findOne({_id: new mongodb.ObjectID(channelId)}, function (err, result) {
        if (err) return callback(false)
        if (!result) return callback(false)
        let isExist = false
        console.log("check senderEmail: " + senderEmail)

        result.members.forEach(member => {
            console.log("check memberEmail: " + member.email)
            if (new String(member.email).valueOf() == new String(senderEmail).valueOf()) {
                isExist = true
            }
        });
        if (!isExist) return callback(false)
        console.log("send message req validate: " + isExist)
        return callback(true)
    })
}