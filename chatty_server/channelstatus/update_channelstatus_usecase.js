const db = require('../data/mongodb/ConnectMongodb')
const mongo = require('mongodb')

module.exports.execute = function (senderEmail, channelId, type, content, callback) {
    let query = {_id : new mongo.ObjectID(channelId)}
    let description = {type: type, content: content}
    let newStatus = {senderEmail: senderEmail, description: description}
    let updateCmd = {$set: {status : newStatus, latestUpdate: new Date().getTime()}}
    db.get().collection ("Channel").updateOne(query, updateCmd, function (err, result) {
        if (err) return callback(fasle)
        if (!result) return callback(false)
        return callback(true)
    } )
}