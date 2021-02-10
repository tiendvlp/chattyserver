module.exports = function (req, res, next) {

    if (req.body.body) {
        req.message.type = "text"
        req.message.content = req.body.body
        return next()
    }

    let fileType = req.resource.fileType
    if (fileType === "image" || fileType === "video" || fileType === "audio") {
        req.message.type = fileType
        req.message.content = req.resource.fileName
        return next()
    }
    
    return res.status("400").json({message: "BAD REQUEST: The resource type is not supported"})
}