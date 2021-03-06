const db = require('../data/mongodb/ConnectMongodb')
const ObjectId = require('mongodb').ObjectID
const messageEntityFactory = require('../domain/entity/message/Index')

function execute (channelId,from,to, callback) {
    let messageCollection = db.get().collection('Message')
    let query = {
        channelId: channelId,
        createdDate: {$gt: parseInt(from), $lt: parseInt(to)}
}    

    let latestSort = {
        createdDate: -1
    }

    return messageCollection.find(query).sort(latestSort).toArray(function (err, result) {
        if (err) {return callback(err, false)}
        if (!result) {return callback(null, false)}

        let messageEntity = result.map ((messageDoc) => {
            return messageEntityFactory(
                messageDoc._id.toString(),
                messageDoc.channelId,
                messageDoc.content,
                messageDoc.type,
                messageDoc.createdDate,
                messageDoc.senderEmail
            )
        })

        return callback (null, messageEntity)
    }) 
}

module.exports = {
    execute
}