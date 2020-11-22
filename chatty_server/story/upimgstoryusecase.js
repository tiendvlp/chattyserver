const db = require('../data/mongodb/ConnectMongodb')
const imageStoryDocument = require('../data/mongodb/story/imagestory/imagestorydocument')
const fs = require('fs')

module.exports.execute = function (userEmail,channelId, {type, imageName}, callback) {
    let newStory = imageStoryDocument({
        owner: userEmail,
        type: type,
        content: imageName,
        uploadedDate: new Date().getTime(),
        outDated: false,
        channelId: channelId
    })
    uploadStoryContentFromTemp(imageName, function (err) {
        if (err) {return callback (err)}
        db.get().collection("Story").insertOne (newStory, function (err) {
            if (err) {return callback(err)}
            return callback(null)        
        })
        clearTemp(imageName)
    })
}

function uploadStoryContentFromTemp (filename, callback) {
    fs.createReadStream('./temp/' +filename)
    .pipe(db.getBucket().openUploadStream(filename))
    .on('error', function (error) {
        return callback(error)
    })
    .on('finish', function () {
        return callback(null)
    })
} 

function clearTemp (filename) {
    fs.unlinkSync('./temp/'+filename)
}