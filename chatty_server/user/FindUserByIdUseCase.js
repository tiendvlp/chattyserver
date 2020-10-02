const db = require('../data/mongodb/ConnectMongodb')

function findUserById (userId, callback) {
    let query = {_id : userId}
    db.get().collection ("Account").findOne(query,function (err, result) {
        if (err) return callback(err, false) 
        if (!result) return callback(null, false)
        return callback(err, result)    })
}

module.exports.execute = findUserById 