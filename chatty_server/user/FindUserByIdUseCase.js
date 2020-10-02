const db = require('../data/mongodb/ConnectMongodb')

function findUserById (userId, callback) {
    let query = {_id : userId}
    db.get().collection ("Account").findOne(query,function (err, result) {
            callback(err, result)
    })
}

module.exports.execute = findUserById 