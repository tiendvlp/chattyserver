const express = require('express')
const router = new express.Router()
var passport = require ('../../services/passport/setup')

router.get("/auth_login", function (req, res, next) {
    console.log("auth_login runnin: " + req.body.email)
    passport.authenticate('LOCAL_LOGIN',
    function (err, user, info) {
        if (err) {return res.status (400).json ({errors: err.message})}
        if (!user) {return res.status (400).json({errors: "Login failed"})}
        return res.status(200).json ({message : "LoginSucess"})
    })(req, res, next)
})  

router.post("/auth_register", function (req, res, next) {
    console.log("auth_register runnin: ")
    passport.authenticate('LOCAL_REGISTER', function (err, user, info) {
        if (err) {return res.status (400).json ({errors: err.message})}
        console.log("create user success: " + user.password)
        return res.status(200).json ({user : user.json})})(req, res, next)
})

module.exports = router