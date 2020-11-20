var passport = require ('../../passport/setup')

module.exports = function (req, res, next) {
    console.log("auth_login runnin: " + req.body.email)
    passport.authenticate('LOCAL_LOGIN',
    function (err, token, info) {
        console.log("Login run")
        if (err) {return res.status (400).json ({errors: err.message})}
        if (!token) {return res.status (400).json({errors: "Login failed"})}
        return res.status(200).json (token).end();
    })(req, res, next)
}