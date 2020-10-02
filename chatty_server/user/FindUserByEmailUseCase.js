const { find } = require('tslint/lib/utils')
const db = require('../data/mongodb/ConnectMongodb')

function findUserByEmail (userEmail, callback) {
    let query = {email : userEmail}
    db.get().collection ("Account").findOne(query,function (err, result) {
            console.log("find one in Account: " + result)
            callback(err, result)
    })
}

module.exports.execute = findUserByEmail