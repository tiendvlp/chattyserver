const db = require('../data/mongodb/ConnectMongodb')
const storyEntity = require('../domain/entity/story/Index')

function execute (userEmail, since, count, callback) {
    db.get().collection("UserObservedChannel").findOne({userEmail: userEmail}, function (err, result) {
        if (err) {return callback(err, false)}
        if (!result) {return callback(null, false)}

        let userObservedChannel = result.observedChannel.map((it) => {return it.toString()})
        let storyQuery = {channelId: {$in: userObservedChannel}, uploadedDate: {$lt : parseInt(since)}, outdatedDate: {$gt: new Date().getTime()}}
        db.get().collection("Story").find(storyQuery).sort({uploadedDate: -1}).limit(count).toArray(function(err, result) {
            if (err) {return callback(err, false)}
            if (!result) {return callback(null, false)}
            let stories = result.map((it) => {return storyEntity(
                it._id.toString(),
                it.owner,
                it.channelId,
                it.content,
                it.type,
                it.uploadedDate,
                it.outdatedDate
            )})
            return callback(null,stories )        })
    })
}

module.exports.execute  = execute