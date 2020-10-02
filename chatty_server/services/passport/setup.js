const Bcrypt = require ('bcryptjs')
const passport = require('passport')
const findUserByEmailUseCase = require ('../../user/FindUserByEmailUseCase')
const findUserByIdUseCase = require ('../../user/FindUserByIdUseCase')
const LocalStrategy = require('passport-local').Strategy
const accountEntity = require('../../domain/entity/account/Index')
const createNewAccountUseCase = require('../../register/CreateAccountUseCase')

passport.serializeUser ((user, done) => {
    done(null, user._id)
})

passport.deserializeUser ( (id, done) => {
    findUserByIdUseCase.execute(id, function (result) {
        if (err) throw err
        if (result) {
            done(null, result)
        }
    })
} )

passport.use('LOCAL_LOGIN',new LocalStrategy({usernameField : "email", passwordField: "password"}, (email, password, done) => {
    findUserByEmailUseCase.execute(email, function (err, user) {
        if (err) return done (err, false)
        if (!user) return done(null, false)
        Bcrypt.compare(password, user.password, function (err, isValid) {
            console.log("Bcrypt compare password: " + isValid)
            if (err) return done (err)
            if (!isValid) return done (null, false)
            return done(null, user)
        })
    })

}))

passport.use('LOCAL_REGISTER', new LocalStrategy ({usernameField : "email", passwordField : "password"}, function (email, password, done) {
    console.log("i'm in")
    findUserByEmailUseCase.execute(email, function (err, user) {
        if (err) return done (err, false)
        if (user) return done (new Error("User already exist"), false)
        // generate a new account
        console.log("generate new user")
        Bcrypt.genSalt(10, function(err, salt) {
            if (err) throw err
            Bcrypt.hash(password, salt, function (err, hash) {
                if (err) throw err
                const newAccount = accountEntity(email, hash, false, new Date())
                createNewAccountUseCase.execute(newAccount, function (err) {
                    if (err) return done (err, false)
                    return done (null, newAccount)
                })
            })
        })
    })
}))

module.exports = passport