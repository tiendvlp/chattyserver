const db = require('../../data/mongodb/ConnectMongodb')
const mongodb = require('mongodb')

module.exports = function (req, res, next) {
    let channelId = req.params.channelid
    console.log("Upload story: " + channelId)
    if (!channelId) {return res.status(404).json({message: "invalid request"})}
    return checkChannel(channelId, req.account.email, function (result) {
        if (!result) {return res.status(400).json({message: "invalid request"})}
        req.story = {channelId: channelId}
        return next()
    })
}

function checkChannel (channelId,senderEmail,callback) {
    return db.get().collection("Channel").findOne({_id: new mongodb.ObjectID(channelId)}, function (err, result) {
        if (err) return callback(false)
        if (!result) {console.log("Khong co channel"); return callback(false)}
        console.log("go go go")
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
