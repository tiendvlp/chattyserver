const db = require('../data/mongodb/ConnectMongodb')
const accountDocument = require ('../data/mongodb/model/account/Index')

function createNewAccount (accountEntity, callback) {
    const newAccount = accountDocument(accountEntity.getEmail(), accountEntity.getPassword(), accountEntity.getIsEmailVerified(), accountEntity.getCreatedDate().getTime())
    db.get().collection ("Account").insertOne(newAccount.getJson(), function (err, result) {
            callback(err, result)
    })
}

module.exports.execute = createNewAccount 