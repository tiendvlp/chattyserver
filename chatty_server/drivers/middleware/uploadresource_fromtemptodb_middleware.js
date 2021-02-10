const db = require('../../data/mongodb/ConnectMongodb')
const fs = require('fs')

module.exports = function (req, res, next) {
    let fileName = req.resource.fileName
    fs.createReadStream('./temp/' + fileName)
    .pipe(db.getBucket().openUploadStream(fileName))
    .on('error', function (error) {
        clearTemp()
        return res.status(500).json({error: error, message: error.message})
    })
    .on('finish', function () {
        clearTemp(fileName)
        return next()
    })
}

function clearTemp (filename) {
    fs.unlinkSync('./temp/'+filename)
}