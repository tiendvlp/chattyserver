const db = require('../data/mongodb/ConnectMongodb')
const fs = require('fs')

module.exports.execute = function (userEmail, callback) {
    // return db.get().collection("User").findOne({email: userEmail}, function (err, result) {
    //     if (err) {return callback(err, false)}
    //     if (!result) {return callback(new Error("404, not found"), false)}
    // })
}
