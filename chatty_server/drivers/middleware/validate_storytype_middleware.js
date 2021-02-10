module.exports = function (req, res, next) {
    let fileType = req.resource.fileType
    if (fileType === "image" || fileType === "video") {
        req.story.type = fileType
        req.story.resourceName = req.resource.fileName
        return next()
    }
    
    return res.status("400").json({message: "BAD REQUEST: The resource type is not supported"})
}