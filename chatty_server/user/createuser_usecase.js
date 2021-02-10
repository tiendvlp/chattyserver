const db = require('../data/mongodb/ConnectMongodb')
const findUserByEmailUsecase =require ('./finduser_byemail_usecase')

const execute = function (param, callback) {
    return findUserByEmailUsecase.execute(param.email, function (err, user) {
        if (err) return callback(err)
        if (user) return callback (new Error ("user already exist"))
        // if user is not exist, create new user
        let newUser = {
            email : param.email,
            name : param.name,
            // by default the avatar is set automatically, user can changed it later
            avatar : "46e9f5e6cae3e99ffa0ef7ec69b2cda9_default_avatar.png"
        }
        db.get().collection("User").insertOne (newUser, function (err) {
            if (err) return callback (err)
            console.log("Create new user: " + err)
            return callback(null)
        }) 
    })

   
}

const param = function (email, name) {
    return {email, name }
}

module.exports = {
    execute : execute,
    param : param
}
