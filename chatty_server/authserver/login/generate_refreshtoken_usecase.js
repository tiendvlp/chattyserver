const jwt = require('jsonwebtoken')
const db = require('../authdb')

module.exports.execute = function (serializableData, callback) {
    const refreshToken = jwt.sign(serializableData, process.env.REFRESH_TOKEN_SECRET)
    let refreshTokenDocument = {
        userEmail : serializableData.email,
        userId : serializableData.id,
        refreshToken : refreshToken,
        createdDate : new Date().getTime()
    }
    console.log("Generate refresh token")
    return db.get().collection("RefreshToken").insertOne(refreshTokenDocument, function (err) {
        if (err) return callback(err, false)
        return callback(null, refreshToken)
    })
}