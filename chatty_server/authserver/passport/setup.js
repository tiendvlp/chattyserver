const passport = require('passport')
const findUserByIdUseCase = require ('../../user/finduser_byemail_usecase')
const LocalStrategy = require('passport-local').Strategy
const loginUseCase = require('../login/login_usecase')
const registerUseCase = require('../../authserver/account/register_usecase')

passport.use("LOCAL_LOGIN",new LocalStrategy({usernameField : "email", passwordField: "password"}, (email, password, done) => {
   return loginUseCase.execute (email, password, function (err, user) {
        if (err) {return done (err, false)}
        if (!user) {return done(null, false)} 
        console.log("Minh tine")
        return done(null, user)
 })
}))

passport.use('LOCAL_REGISTER', new LocalStrategy ({usernameField : "email", passwordField : "password"}, function (email, password, done) {
    return registerUseCase.execute(email, password, function (err) {
        if (err) {return done (err, false)}
        return done (null, {email, password})
    })
}))

module.exports = passport