const db = require('../data/mongodb/ConnectMongodb')
const ObjectId = require('mongodb').ObjectID
const updateStatusUseCase = require('../channelstatus/update_channelstatus_usecase')

const execute = function (messageBody, senderEmail, channelId, type, content, callback) {
    var newMessageDoc = {
        type: type,
        content: content,
        senderEmail : senderEmail,
        channelId : new ObjectId (channelId),
        createdDate : new Date().getTime()
    }
    return db.get().collection("Message").insertOne (newMessageDoc, function (err) {
        if (err) {return callback(err, false)}

        return updateStatusUseCase.execute(senderEmail,channelId, "Text", messageBody, function (err) {
            return callback (null, newMessageDoc)
        })
    })
}

module.exports.execute = execute