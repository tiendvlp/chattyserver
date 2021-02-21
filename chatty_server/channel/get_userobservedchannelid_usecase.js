const db = require('../data/mongodb/ConnectMongodb')

module.exports.execute = function (email, callback) {
    db.get().collection("UserObservedChannel").findOne({userEmail: email}, function (err, result) {
        if (err) {return callback(err, false)}
        return callback(null, result.observedChannel.map((it) => {return it.toString()}))
    })
}