const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = function(req, res, next) {
    const authHeader = req.headers['authorization']

    if (!authHeader) { console.log("header not found"); return res.status(400).send({ message: "UnAuthorize" }) }

    const authToken = authHeader.split(' ')[1]
    if (authToken == null) { return res.status(401).json("auth token does't exist !") }
    console.log("verify auth")
    return jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, function(err, account) {
        console.log("token to verify: " + authToken)
        if (err) return res.status(401).json({ message: "err: " + err })
        if (!account) return res.status(401).json({ message: "Invalid token" })
        req.account = account
        next()
    })
}