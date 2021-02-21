module.exports = function (req, res, next) {
    let fileType = req.resource.fileType
    if (fileType === "image") {
        if (req.resource.dimensions.width === req.resource.dimensions.height) {
            req.avatar = req.resource.fileName
            return next()
        } else {
            return res.status("400").json({message: "BAD REQUEST: The avatar dimension have to be SQUARE"})
        }
    }
    
    return res.status("400").json({message: "BAD REQUEST: The avatar resource type is not supported"})
}