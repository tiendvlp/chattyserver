const db = require('../data/mongodb/ConnectMongodb')
const imageStoryDocument = require('../data/mongodb/story/imagestory/imagestorydocument')
const fs = require('fs')
const update_channelstatus_usecase = require('../channelstatus/update_channelstatus_usecase')

module.exports.execute = function (userEmail,channelId, type, resourceName, callback) {
    const uploadedDate = new Date()
    const expiredDate = new Date()
    expiredDate.setDate(uploadedDate.getDate() + 1)

    let newStory = {
        owner: userEmail,
        type: type,
        content: resourceName,
        uploadedDate: uploadedDate.getTime(),
        outdatedDate: expiredDate.getTime(),
        channelId: channelId
    }

    db.get().collection("Story").insertOne (newStory, function (err, result) {
        clearTemp(resourceName)
        if (err) {return callback(err, false)}
        update_channelstatus_usecase.execute(userEmail, channelId, "storyId/text", "New story", function (err) {
        })
        return callback(null, result.ops[0])        
    })
}

function clearTemp (filename) {
    if (fs.existsSync('./temp/'+filename)) {
        fs.unlinkSync('./temp/'+filename)
    }
}