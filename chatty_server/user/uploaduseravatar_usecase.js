const db = require('../data/mongodb/ConnectMongodb')
const fs = require('fs')

module.exports.execute = function (userEmail, imageName, callback) {
    return db.get().collection("User").updateOne({email: userEmail}, {$set: {avatar: imageName}}, function (err, result) {
        if (err) {return callback(err, false)}
        if (!result) {return callback(new Error("404, not found"), false)}
        return callback(null,true)
    } )
}
