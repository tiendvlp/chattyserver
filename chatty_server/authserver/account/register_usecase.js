const findAccountByEmailUseCase = require('./find_account_byemail_usecase')
const createNewAccountUseCase = require('./create_account_usecase')
const Bcrypt = require ('bcryptjs')
const accountEntity = require('../../domain/entity/account/Index')

module.exports.execute = function (email, password, callback) {
    return findAccountByEmailUseCase.execute(email, function (err, user) {
        if (err) return callback (err)
        if (user) return callback ({message: "Your user already exist", code: 409})
        // generate a new account
        console.log("generate new user")
        return Bcrypt.genSalt(10, function(err, salt) {
            if (err) return callback (err)
            console.log("generate new user")
            return Bcrypt.hash(password, salt, function (err, hash) {
                if (err) return callback (err)
                console.log("generate new user: " + email)
                const param =  createNewAccountUseCase.param(email, hash)
                return createNewAccountUseCase.execute(param, function (err) {
                    console.log("generate new user")
                    if (err) return callback (err)
                    return callback (null)
                })
            })
    })})
}