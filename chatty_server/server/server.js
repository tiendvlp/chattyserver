const express = require('express')
const http = require('http')
const mongodbIndex = require('../data/mongodb/ConnectMongodb')
const userRouter = require('../drivers/routes/userrouter')
const channelRouter = require('../drivers/routes/channelrouter')
const resourceRouter = require('../drivers/routes/resource_router')
const messageRouter = require('../drivers/routes/messagerouter')
const socketIoConnectionProcess = require('./socketioconnection_process')
const storyRouter = require('../drivers/routes/storyrouter')
const bodyParser = require('body-parser')
const app = express()
const server = http.createServer(app)
const io_instance = require('../common/socket_io_instance')
const firebaseAdmin = require('firebase-admin')
const firebaseInstance = require('../common/firebaseadmin_instance')
const accountService = require('../service_account.json')
const graphqlRouter = require('../drivers/routes/graphql_router')
const verifyauth = require('../drivers/middleware/verifyauth_middleware')
    // init router
app.use(function(req, res, next) {
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
firebaseInstance.init()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

// using own-router
app.use('/story', storyRouter)
app.use('/channel', channelRouter)
app.use('/user', userRouter)
app.use('/message', messageRouter)
app.use('/resource', resourceRouter)
app.use('/graphql', verifyauth, graphqlRouter)


app.get('/', (req, res) => {
    res.json({ message: 'Chat API is ALIVE!' })
});


const PORT = process.env.PORT || 3000

server.listen(PORT, (req, res, next) => {
    mongodbIndex.connect((err) => {
        if (err) {
            console.log("Can not connect to database (mongo)")
            return
        }
        io_instance.connect(server)
        socketIoConnectionProcess.listen()

    })

})