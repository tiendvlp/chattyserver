const db = require('../data/mongodb/ConnectMongodb')
const ObjectId = require('mongodb').ObjectID
const messageEntityFactory = require('../domain/entity/message/Index')

function execute (channelId,since, count, callback) {
    let messageCollection = db.get().collection('Message')
    let query = {
        channelId: new ObjectId(channelId),
        createdDate: {$lt : parseInt(since)}
    }    

    let latestSort = {
        createdDate: -1
    }

    return messageCollection.find(query).sort(latestSort).limit(count).toArray(function (err, result) {
        if (err) {return callback(err, false)}
        if (!result) {return callback(null, false)}

        let messageEntity = result.map ((messageDoc) => {
            return messageEntityFactory(
                messageDoc._id.toString(),
                messageDoc.channelId.toString(),
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