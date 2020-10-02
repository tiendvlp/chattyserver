const passport = require('passport')
const findUserByIdUseCase = require ('../../user/FindUserByIdUseCase')
const LocalStrategy = require('passport-local').Strategy
const loginUseCase = require('../../authserver/login/loginusecase')
const registerUseCase = require('../../authserver/account/RegisterUseCase')

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
   loginUseCase.execute (email, password, function (err, user) {
        if (err) return done (err, false)
        if (!user) return done(null, false)  
        return done(null, user)
 })
}))

passport.use('LOCAL_REGISTER', new LocalStrategy ({usernameField : "email", passwordField : "password"}, function (email, password, done) {
    registerUseCase.execute(email, password, function (err) {
        if (err) return done (err, false)
        return done (null, {email, password})
    })
}))

module.exports = passport