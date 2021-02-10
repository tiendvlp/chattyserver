const db = require('../data/mongodb/ConnectMongodb')
const imageStoryDocument = require('../data/mongodb/story/imagestory/imagestorydocument')
const fs = require('fs')

module.exports.execute = function (userEmail,channelId, type, resourceName, callback) {
    const uploadedDate = new Date()
    const expiredDate = new Date()
    expiredDate.setDate(expiredDate.getDate() + 1)

    let newStory = {
        owner: userEmail,
        type: type,
        content: resourceName,
        uploadedDate: uploadedDate.getTime(),
        outdatedDate: expiredDate.getTime(),
        channelId: channelId
    }

    db.get().collection("Story").insertOne (newStory, function (err) {
        clearTemp(resourceName)
        if (err) {return callback(err)}
        return callback(null)        
    })
}

function clearTemp (filename) {
    if (fs.existsSync('./temp/'+filename)) {
        fs.unlinkSync('./temp/'+filename)
    }
}