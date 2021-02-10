var passport = require ('../../passport/setup')

module.exports = function (req, res, next) {
    console.log("auth_register runnin: ")
    passport.authenticate('LOCAL_REGISTER', function (err, user, info) {
        if (err) {
            if (err.code) {
                if (err.code === 409) {
                    return res.status(409).json({error: err.message})
                }
            }
            return res.status (502).json ({error: err.message})}
        console.log("create user success: " + user.password)
        return res.status(200).json ({user : user})})(req, res, next)
}