const db = require('../authdb')

function createNewAccount (param, callback) {
    const newAccount = {
        email: param.email, 
        password : param.password, 
        isEmailVerified: false, 
        //time that save in db have to be in millisecond-format
        createdDate: new Date().getTime()
    }
    return db.get().collection ("Account").insertOne(newAccount, function (err) {
            console.log("CreateNewAccount error: " + err)
            if (err) return callback(err)
            return callback(err)
    })
}

const param = function (email, password) {return {email,password}}
module.exports = {execute : createNewAccount , param : param}