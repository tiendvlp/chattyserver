const db = require('../data/mongodb/ConnectMongodb')
const channelEntity = require('../domain/entity/channel/Index')

module.exports.execute = function (channelId, callback) {
    db.get().collection('Channel').findOne({_id:channelId}, function (err, result) {
        if (err) {return callback(err, false)}
        if (!result) {return callback(null, false)}
        
        return callback(null, result)
    })
}