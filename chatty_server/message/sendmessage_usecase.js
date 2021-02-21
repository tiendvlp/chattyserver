const db = require('../data/mongodb/ConnectMongodb')
const ObjectId = require('mongodb').ObjectID
const updateStatusUseCase = require('../channelstatus/update_channelstatus_usecase')

const execute = function (senderEmail, channelId, type, content, callback) {
    console.log("channel id la " + channelId)
    var newMessageDoc = {
        type: type,
        content: content,
        senderEmail : senderEmail,
        channelId : new ObjectId (channelId),
        createdDate : new Date().getTime()
    }
    return db.get().collection("Message").insertOne (newMessageDoc, function (err, result) {
        if (err) {return callback(err, false)}
        return updateStatusUseCase.execute(senderEmail,channelId, type, content, function (err) {
            return callback (null, result.ops[0])
        })
    })
}

module.exports.execute = execute