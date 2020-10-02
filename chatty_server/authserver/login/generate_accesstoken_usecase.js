const jwt = require('jsonwebtoken')
const db = require('../authdb')

module.exports.execute = function (refreshToken, callback) {
    const query = {refreshToken : refreshToken}
    db.get().collection("RefreshToken").findOne (query, function (err, result) {
        if (result) {
            jwt.verify(result.refreshToken, process.env.REFRESH_TOKEN_SECRET, function (err, user) {
                if (user) {
                    const accessToken = generateAccessToken(user)
                   return callback(null, accessToken)
                }
            })
        }
        return callback (err, false)
    })
}

const generateAccessToken = function (serializeUser) {
    return jwt.sign(serializeUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}