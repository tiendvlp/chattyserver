const findAccountByEmailUseCase = require('../account/find_account_byemail_usecase')
const bcrypt = require ('bcryptjs')
const generateRefreshTokenUseCase = require('./generate_refreshtoken_usecase')
const generateAccessTokenUseCase = require('./generate_accesstoken_usecase')

require('dotenv').config()

module.exports.execute = function (email, password, callback) {
    return findAccountByEmailUseCase.execute(email, function (err, account) {
        if (err)  return callback (err, false)
        if (!account)  return callback (null, false) 
        return bcrypt.compare(password, account.getPassword(), function (err, isValid) {
            console.log("Bcrypt compare password: " + isValid)
            if (err) return callback (err)
            if (!isValid) return callback (null, false)
            // if nothing wrong, we start generate access & refresh token
            console.log("loginusecase: " + "userId: " + account.getId())
            return generateRefreshTokenUseCase.execute({email: account.getEmail(), id: account.getId()}, function (err, refreshToken) {
                if (err) return callback(err, null)
                if (!refreshToken) {return callback(false, null)}
                return generateAccessTokenUseCase.execute(refreshToken.token, function (err, accessToken) {
                    if (err) {return callback(err, null)}
                    if (!accessToken) {return callback(null, false)}
                    return callback(null, {accessToken: accessToken, refreshToken: refreshToken})
                })
            })
        })
    })
}
