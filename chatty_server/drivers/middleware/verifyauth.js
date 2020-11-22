const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization']
    const authToken = authHeader.split(' ')[1]
    if (authToken == null) return res.status(401).json("auth token does't exist !")   
    console.log("verify auth")
    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, function (err, account) {
        console.log(err)
        if (err) return res.status(400).json({message: "err: " + err })
        if (!account) return res.status(400).json({message: "Invalid token"})

        req.account = account
        next()
    })

}
