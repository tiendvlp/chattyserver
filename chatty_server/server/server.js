var express = require('express')
var app = express()
var mongodbIndex = require('../data/mongodb/ConnectMongodb')
var passport = require ('../services/passport/setup')
var authRouter = require('../drivers/routes/authrouter')
var bodyParser = require('body-parser')

mongodbIndex.connect((err) => {
    if (!err) {
        app.listen(300, (req, res, next) => {

        })
    }
})

app.get('/', (req, res) => {
    res.json({ message: 'Chat API is ALIVE!' })
  });
app.use(bodyParser())
app.use('/auth', authRouter)

app.use(passport.initialize())
app.use(passport.session())