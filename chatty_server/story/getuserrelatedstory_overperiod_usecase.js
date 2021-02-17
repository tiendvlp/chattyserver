const db = require('../data/mongodb/ConnectMongodb')
const storyEntity = require('../domain/entity/story/Index')

module.exports.execute = function (userEmail, from, to, callback) {
    db.get().collection("UserObservedChannel").findOne({userEmail: userEmail}, function (err, result) {
        if (err) {return callback(err, false)}
        if (!result) {return callback(null, false)}

        let userObservedChannel = result.observedChannel.map((it) => {return it.toString()})
        let storyQuery = {channelId: {$in: userObservedChannel}, uploadedDate: {$gt: parseInt(from), $lt: parseInt(to)}, outdatedDate: {$gt: new Date().getTime()}}
        db.get().collection("Story").find(storyQuery).sort({uploadedDate: -1}).toArray(function(err, result) {
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
            return callback(null,stories )
        })
    })
}