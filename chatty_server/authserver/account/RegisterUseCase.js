const findAccountByEmailUseCase = require('./FindAccountByEmailUseCase')
const createNewAccountUseCase = require('./CreateAccountUseCase')
const Bcrypt = require ('bcryptjs')
const accountEntity = require('../../domain/entity/account/Index')

module.exports.execute = function (email, password, callback) {
    findAccountByEmailUseCase.execute(email, function (err, user) {
        if (err) return callback (err)
        if (user) return callback (new Error("User already exist"))
        // generate a new account
        console.log("generate new user")
        Bcrypt.genSalt(10, function(err, salt) {
            if (err) return callback (err)
            console.log("generate new user")
            Bcrypt.hash(password, salt, function (err, hash) {
                if (err) return callback (err)
                console.log("generate new user: " + email)
                const param =  createNewAccountUseCase.param(email, hash)
                createNewAccountUseCase.execute(param, function (err) {
                    console.log("generate new user")
                    if (err) return callback (err)
                    return callback (null)
                })
            })
    })})
}