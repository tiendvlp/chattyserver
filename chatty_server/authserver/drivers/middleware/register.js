var passport = require ('../../passport/setup')

module.exports = function (req, res, next) {
    console.log("auth_register runnin: ")
    passport.authenticate('LOCAL_REGISTER', function (err, user, info) {
        if (err) {return res.status (400).json ({errors: err.message})}
        console.log("create user success: " + user.password)
        return res.status(200).json ({user : user})})(req, res, next)
}