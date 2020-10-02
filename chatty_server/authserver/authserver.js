require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const passport = require ('./passport/setup')
const authRouter = require('../authserver/drivers/routes/authrouter')
const bodyParser = require('body-parser')
const authDb = require('./authdb')

authDb.connect((err) => {
    if (!err) {
        app.listen(3000, (req, res, next) => {
            console.log('Connected to auth')
        })
    }
})

app.listen (4000, function (req, res, next) {
        
})

app.get('/', function (req, res, next) {
    return res.json({message: "chat app authentication is ready"})
})

app.use(express.json())
app.use(bodyParser())
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter)