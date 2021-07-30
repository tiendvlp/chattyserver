const config = require('../common/config')

module.exports = function(req, res, next) {
    if (req.body.body) {
        req.message.type = "text"
        req.message.content = req.body.body
        return next()
    }

    let fileType = req.resource.fileType
    if (fileType === "image" || fileType === "video" || fileType === "audio") {
        req.resource.type = {
            type: "media",
            folderPath: config.mediaTempFolder
        }
        req.message.type = fileType
        req.message.content = " sent an attachment"
        return next()
    }

    return res.status("400").json({ message: "BAD REQUEST: The resource type is not supported" })
}