const firebaseAdminInstance = require('../common/firebaseadmin_instance')
const redisClientInstance = require('../common/redis_client_instance')

module.exports.execute = function (userEmail, fcmId, channelId, callback) {
    return redisClientInstance.smembers("fcm:" + userEmail, function (fcmIds) {
        var match = false;
        fcmIds.array.forEach(element => {
            if (element === fcmId) {
                match = true
                break
            }
        })
        if (!match) {return callback(Error("404: Your fcm_id is not found in register_device list"))}

        firebaseAdminInstance.get().messaging().subscribeToTopic(fcmId, channelId)

        return callback(null)
    })
}