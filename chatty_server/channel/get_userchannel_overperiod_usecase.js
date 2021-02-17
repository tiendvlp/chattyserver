const mongodb = require('../data/mongodb/ConnectMongodb')
const channelEntity = require('../domain/entity/channel/Index')

function execute (userEmail,from, to, callback) {
    let channelCollection = mongodb.get().collection('Channel')

    let query = {
        // channel that have userEmail as a member
        members: {$elemMatch: {email: userEmail}},
        latestUpdate: {$gt: parseInt(from), $lt: parseInt(to)}
    }
    
    let sort = {
        latestUpdate: -1
    }

    return channelCollection.find(query).sort(sort).toArray(function (err, result) {
        if (err) {return callback(err, false)} 
        if (!result) {return callback(null, false)}

        var channelEntities = []

        for (i = 0; i < result.length; i++) {
            var members = result[i].members.map((mem) => {
                return {
                   id: mem._id.toString(),
                   email: mem.email,
                   name: mem.name,
                   avatar: mem.avatar 
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
                result[i].admin           )
        }
        
        return callback(null, channelEntities )
    })
}

module.exports.execute = execute