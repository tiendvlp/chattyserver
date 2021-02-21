const socketInstance = require('../common/socket_io_instance')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.listen = function () {
    socketInstance.get().on('connection', function (client) {
        client.on('disconnect', function () {
            console.log("Good bye")
        })

        client.on('joinRoom', function  (accessToken) {
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, function (err, account) {
                if (err) return
                if (!account) return
                client.join(account.email)     
            })
       })
    })
}