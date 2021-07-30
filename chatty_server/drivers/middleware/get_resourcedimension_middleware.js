const sizeOf = require('image-size')

module.exports = function(req, res, next) {
    if (req.resource.fileType === "image") {
        sizeOf('./' + req.resource.folderPath + "/" + req.resource.fileName, function(err, dimensions) {
            if (err) { return res.status(400).json({ message: "can not get resouce dimension", err: err }) }
            console.log("dimension: " + dimensions.width)
            req.resource.dimensions = dimensions
            return next()
        })
    } else {
        return res.status(400).json({ message: "Invalid request, avatar have to be an image" })
    }
}