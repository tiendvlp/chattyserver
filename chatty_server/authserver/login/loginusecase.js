const findAccountByEmailUseCase = require('../account/FindAccountByEmailUseCase')
const Bcrypt = require ('bcryptjs')
const generateRefreshTokenUseCase = require('./generate_refreshtoken_usecase')
const generateAccessTokenUseCase = require('./generate_accesstoken_usecase')
require('dotenv').config()

module.exports.execute = function (email, password, callback) {
    findAccountByEmailUseCase.execute(email, function (err, account) {
        if (err)  return callback (err, false)
        if (!account)  return callback (null, false) 
        Bcrypt.compare(password, account.getPassword(), function (err, isValid) {
            console.log("Bcrypt compare password: " + isValid)
            if (err) callback (err)
            if (!isValid) callback (null, false)
            // if nothing wrong, we start generate access & refresh token
            console.log("loginusecase: " + "userId: " + account.getId())
            generateRefreshTokenUseCase.execute({email: account.getEmail(), id: account.getId()}, function (err, refreshToken) {
                if (err) return callback(err, null)
                generateAccessTokenUseCase.execute(refreshToken, function (err, accessToken) {
                    if (err) return callback(err, null)
                    return callback(null, {accessToken: accessToken, refreshToken: refreshToken})
                })
            })
        })
    })
}