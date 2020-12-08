require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const passport = require ('./passport/setup')
const authRouter = require('../authserver/drivers/routes/authrouter')
const bodyParser = require('body-parser')
const authDb = require('./authdb')
const redisClientInstance = require('./common/redis_client_instance')

authDb.connect((err) => {
    if (!err) {
        app.listen(4000, (req, res, next) => {
            console.log('Connected to auth')
        })
    }
})

app.get('/', function (req, res, next) {
    return res.json({message: "chat app authentication is ready"})
})

app.use(express.json())
app.use(bodyParser())
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter)