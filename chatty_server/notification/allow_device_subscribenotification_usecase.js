const firebaseAdminInstance = require('../common/firebaseadmin_instance')
const mongodb = require('../data/mongodb/ConnectMongodb')
const redisClientInstance = require('../common/redis_client_instance')

module.exports.execute = function (userEmail, fcmDeviceId, callback) {
    observe(userEmail, fcmDeviceId, callback)
}

function observe (userEmail, fcmDeviceId, callback) {
    const collection = mongodb.get().collection ('UserObservedChannel')
    return collection.findOne({userEmail: userEmail}, function (err, result) {
        if (err) {return callback (err)}
        // fcmTopic is the channelId
        result.observedChannel.forEach(function (topic, i ) {
            firebaseAdminInstance.get().messaging().subscribeToTopic(fcmDeviceId, topic.toString())
        })

        redisClientInstance.sadd("fcm:"+userEmail, [fcmDeviceId])

        return callback(null)
    })
}