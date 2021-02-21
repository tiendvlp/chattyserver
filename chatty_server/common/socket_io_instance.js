var io ;

function connect (httpserver) {
    const socketio = require('socket.io')
    io = socketio(httpserver)
    io.on("connection", function (socket) {
        console.log("Client Connected")
    })
}

function get () {
    return io
}

module.exports =  {
    connect, get
}