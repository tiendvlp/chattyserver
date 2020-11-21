const db = require('../data/mongodb/ConnectMongodb')
const ObjectId = require('mongodb').ObjectID

const execute = function (messageBody, senderEmail, channelId, callback) {
    var newMessageDoc = {
        type: "Text",
        content: messageBody,
        senderEmail : senderEmail,
        channelId : new ObjectId (channelId),
        createdDate : new Date().getTime()
    }
    return db.get().collection("Message").insertOne (newMessageDoc, function (err) {
        if (err) {return callback(err)}
        return callback (null)
    })
}

module.exports.execute = execute