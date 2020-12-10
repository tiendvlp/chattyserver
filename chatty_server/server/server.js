const express = require('express')
const http = require('http')
const mongodbIndex = require('../data/mongodb/ConnectMongodb')
const userRouter = require('../drivers/routes/userrouter')
const channelRouter = require('../drivers/routes/channelrouter')
const messageRouter = require('../drivers/routes/messagerouter')
const socketIoConnectionProcess = require('./socketioconnection_process')
const storyRouter = require('../drivers/routes/storyrouter')
const bodyParser = require('body-parser')
const app = express()
const server = http.createServer(app)
const io_instance = require('../common/socket_io_instance')
const firebaseAdmin = require('firebase-admin')
const accountService = require('../service_account.json')
const notificationRouter = require('../drivers/routes/notificationrouter')
const graphqlRouter = require('../drivers/routes/graphql_router')

    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(accountService),
        databaseURL: "https://chatible-c85d4.firebaseio.com"
      })
const client_token = "diqGH43sTI-aZ5Nl8Znjzx:APA91bG9KSBtEFNnjot3D9oq67utREss1CYsoY2HcwfWiOAquOqETuf40TmIGd_nAiBSo1T4_slIMoZVPS52lnhOGumGATMGuYTNGWFIRAQc6JP6eoIkwgWC2aU5pRdXU0N8L2-GPTp-"
//
var payload = {
  to2: "/topics/News",
  notification: {
    title:"Portugal vs. Denmark",
    body: "How are you today ?"
  }
}

var message = {
    data: {
      "story_id": "story_12345"
  }
}


var options = {
    priority: "normal",
    timetolive: 5 // minutes
}
////
firebaseAdmin.instanceId().deleteInstanceId(client_token).then(function () {
  console.log("success token")
}, function () {
  console.log("failed token")
})

firebaseAdmin.messaging().sendToDevice(client_token, message, options)
// init router
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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

// using own-router
app.use('/story', storyRouter.router)
app.use('/channel', channelRouter)
app.use('/user', userRouter)
app.use('/message', messageRouter)
app.use('/notification', notificationRouter)
app.use('/graphql',graphqlRouter)
app.get('/', (req, res) => {
    res.json({ message: 'Chat API is ALIVE!' })
  });


const PORT = process.env.PORT || 3000

server.listen(PORT, (req, res, next) => {
  storyRouter.init()
  mongodbIndex.connect((err) => {
    if (err) {
        console.log("Can not connect to database (mongo)")
        return
      }
  io_instance.connect(server)
  socketIoConnectionProcess.listen()

})

})
