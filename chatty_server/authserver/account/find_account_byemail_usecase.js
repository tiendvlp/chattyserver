const db = require('../authdb')
const accountEntity = require('../../domain/entity/account/Index')

function findAccountByEmail (userEmail, callback) {
    let query = {email : userEmail}
    console.log('email to be query: ' + userEmail)
    return db.get().collection ("Account").findOne(query,function (err, result) {
            if (err) return callback(err, false) 
            if (!result) return callback(null, false)
            console.log("find one in Account: " + result._id + "")
            return callback(err, convertToAccountEntity(result))
    })
}

function convertToAccountEntity (accountDocument) {
    return accountEntity(
        accountDocument._id + "",
        accountDocument.email,
        accountDocument.password,
        accountDocument.isEmailVerified, 
        new Date(accountDocument.createdDate))
}

module.exports.execute = findAccountByEmail