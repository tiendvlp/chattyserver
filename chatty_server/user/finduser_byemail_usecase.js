const { find } = require('tslint/lib/utils')
const db = require('../data/mongodb/ConnectMongodb')
const userEntityFactory = require('../domain/entity/user/Index')

function findUserByEmail (userEmail, callback) {
    let query = {email : userEmail}
    console.log('email to be query: ' + userEmail)
    db.get().collection ("User").findOne(query,function (err, result) {
            if (err) return callback(err, false) 
            if (!result) return callback(null, false)
            let userEntity = userEntityFactory(result._id.toString(),result.email, result.name, result.avatar)
            return callback(err, userEntity)
    })
}

module.exports.execute = findUserByEmail