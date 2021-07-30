const db = require('../data/mongodb/ConnectMongodb')
const mongo = require('mongodb')

module.exports.execute = function(senderEmail, channelId, type, content, createdDate, callback) {
    let query = { _id: new mongo.ObjectID(channelId) }
    let newStatus = { senderEmail: senderEmail, type: type, content: content }
    var date = new Date().getTime()
    if (createdDate) {
        date = createdDate
    }
    let updateCmd = { $set: { status: newStatus, latestUpdate: date } }
    db.get().collection("Channel").updateOne(query, updateCmd, function(err, result) {
        if (err) return callback(fasle)
        if (!result) return callback(false)
        return callback(true)
    })
}