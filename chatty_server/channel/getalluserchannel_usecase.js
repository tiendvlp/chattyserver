const mongodb = require('../data/mongodb/ConnectMongodb')

function execute (userEmail, count, callback) {
    let channelCollection = mongodb.get().collection('Channel')

    let query = {
        admin: userEmail
    }

    return channelCollection.find(query).limit(count).toArray(function (err, result) {
        if (err) {return callback(err, false)} 
        if (!result) {return callback(null, false)}

        return callback(null, result)
    })
}


module.exports.execute = execute