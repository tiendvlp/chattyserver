const socketInstance = require('../common/socket_io_instance')
const db = require('../data/mongodb/ConnectMongodb')

module.exports.listen = function () {
    const collection = db.get().collection('UserObservedChannel')
    socketInstance.get().on('connection', function (client) {
        console.log("Welcome2")
        
        client.on('NewClient', function (userEmail) {
            collection.findOne({userEmail: userEmail}, function (err, result) {
                if (err) {return}
                if (!result) {return}
                client.join(result.observedChannel)
            })
        })
        
        client.on('disconnect', function () {
            console.log("Good bye")
        })
    })
}