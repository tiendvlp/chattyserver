var io ;

function connect (httpserver) {
    const socketio = require('socket.io')
    io = socketio(httpserver)
}

function get () {
    return io
}

module.exports =  {
    connect, get
}