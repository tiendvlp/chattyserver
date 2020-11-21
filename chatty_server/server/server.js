var express = require('express')
var app = express()
var mongodbIndex = require('../data/mongodb/ConnectMongodb')
const userRouter = require('../drivers/routes/user')
const channelRouter = require('../drivers/routes/channel')
mongodbIndex.connect((err) => {
    if (!err) {
        app.listen(3000, (req, res, next) => {

        })
    }
})
app.use(express.json())

app.use('/user', userRouter)
app.use('/channel', channelRouter)

app.get('/', (req, res) => {
    res.json({ message: 'Chat API is ALIVE!' })
  });
