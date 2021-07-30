const db = require('../data/mongodb/ConnectMongodb')
const ObjectId = require('mongodb').ObjectID
const updateStatusUseCase = require('../channelstatus/update_channelstatus_usecase')

const execute = function(senderEmail, channelId, type, content, callback) {
    var newMessageDoc = {
        type: type,
        content: content,
        senderEmail: senderEmail,
        channelId: channelId,
        createdDate: new Date().getTime()
    }
    return db.get().collection("Message").insertOne(newMessageDoc, function(err, result) {
        if (err) { return callback(err, false) }
        return updateStatusUseCase.execute(senderEmail, channelId, type, content, newMessageDoc.createdDate, function(err) {
            return callback(null, result.ops[0])
        })
    })
}

module.exports.execute = execute