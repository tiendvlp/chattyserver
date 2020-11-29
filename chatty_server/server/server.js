const express = require('express')
const app = express()
const http = require('http').createServer(app)
const mongodbIndex = require('../data/mongodb/ConnectMongodb')
const userRouter = require('../drivers/routes/userrouter')
const channelRouter = require('../drivers/routes/channelrouter')
const messageRouter = require('../drivers/routes/messagerouter')
const storyRouter = require('../drivers/routes/storyrouter')
const bodyParser = require('body-parser')
const io = require('socket.io')(http)

mongodbIndex.connect((err) => {
    if (!err) {
        app.listen(3000, (req, res, next) => {
            storyRouter.init()
        })
    }
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
})

io.on('connection', function (socket) {
    console.log('a new user connected')
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use('/story', storyRouter.router)
app.use('/channel', channelRouter)
app.use('/user', userRouter)
app.use('/message', messageRouter)
app.get('/', (req, res) => {
    res.json({ message: 'Chat API is ALIVE!' })
  });

