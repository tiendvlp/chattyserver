const db = require('../data/mongodb/ConnectMongodb')
const findUserByEmailUsecase =require ('../user/FindUserByEmailUseCase')

const execute = function (param, callback) {
    findUserByEmailUsecase.execute(param.email, function (err, user) {
        if (err) return callback(err)
        if (user) return callback (new Error ("user already exist"))
        // if user is not exist, create new user
        let newUser = {
            email : param.email,
            name : param.name,
            avatar : param.avatar
        }
        db.get().collection("User").insertOne (newUser, function (err) {
            if (err) return callback (err)
            console.log("Create new user: " + err)
            return callback(null)
        }) 
    })

   
}

const param = function (email, name, avatar) {
    return {email, name, avatar }
}

module.exports = {
    execute : execute,
    param : param
}
