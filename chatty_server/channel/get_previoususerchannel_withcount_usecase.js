const mongodb = require('../data/mongodb/ConnectMongodb')
const channelEntity = require('../domain/entity/channel/Index')

function execute(userEmail, since, count, callback) {
    let channelCollection = mongodb.get().collection('Channel')

    let query = {
        // channel that have userEmail as a member
        members: { $elemMatch: { email: userEmail } },
        latestUpdate: { $lt: parseInt(since) }
    }
    let sort = {
        latestUpdate: -1
    }
    console.log("excute 11")

    return channelCollection.find(query).limit(count).sort(sort).toArray(function(err, result) {
        if (err) { return callback(err, false) }
        if (!result) { return callback(null, false) }

        var channelEntities = []

        for (i = 0; i < result.length; i++) {
            var members = result[i].members.map((mem) => {
                return {
                    id: mem.id,
                    email: mem.email
                }
            })

            channelEntities[channelEntities.length] = channelEntity(
                result[i]._id.toString(),
                result[i].title,
                members,
                result[i].seen,
                result[i].createdDate,
                result[i].latestUpdate,
                result[i].status,
                result[i].admin)
        }

        return callback(null, channelEntities)
    })
}


module.exports.execute = execute