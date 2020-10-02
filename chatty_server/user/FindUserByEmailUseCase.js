const { find } = require('tslint/lib/utils')
const db = require('../data/mongodb/ConnectMongodb')

function findUserByEmail (userEmail, callback) {
    let query = {email : userEmail}
    console.log('email to be query: ' + userEmail)
    db.get().collection ("User").findOne(query,function (err, result) {
            if (err) return callback(err, false) 
            if (!result) return callback(null, false)
            return callback(err, result)
    })
}

module.exports.execute = findUserByEmail