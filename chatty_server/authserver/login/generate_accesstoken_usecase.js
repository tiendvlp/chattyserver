const jwt = require('jsonwebtoken')
const db = require('../authdb')

module.exports.execute = function (refreshToken, callback) {
    const query = {refreshToken : refreshToken}
    return db.get().collection("RefreshToken").findOne (query, function (err, result) {
        if (result) {
            return jwt.verify(result.refreshToken, process.env.REFRESH_TOKEN_SECRET, function (err, refreshData) {
                if (refreshData) {
                    const newTokenData = {email: refreshData.email, id: refreshData.id,}
                    const accessToken = generateAccessToken(newTokenData)
                   return callback(null, accessToken)
                }
                if (err) return callback (err, false)
                return callback(null, false)
            })
        }
         return callback (err, false)
    })
}

const generateAccessToken = function (serializeUser) {
    return jwt.sign(serializeUser, process.env.ACCESS_TOKEN_SECRET, { algorithm: "HS256", expiresIn: '1d' })
}