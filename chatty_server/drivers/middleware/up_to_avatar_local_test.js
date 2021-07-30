const multer = require('multer')
const crypto = require('crypto')
const storage = multer.diskStorage({

    destination: function(req, file, callback) {
        callback(null, './testsrc/avatar');
    },

    filename: function(req, file, callback) {
        let fileNames = file.originalname.split('.')
        let fileExtension = fileNames[fileNames.length - 1]
        crypto.randomBytes(16, (err, buf) => {
            if (err) {
                return callback(err, false)
            }
            const filename = buf.toString("hex") + "." + fileExtension
            req.resource = { fileType: file.mimetype.split('/')[0], fileExtension: fileExtension, fileName: filename }
            console.log("crypto: " + filename)
            return callback(null, filename)
        });
    }
});

const multerFilter = function(req, file, callback) {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        return callback(null, true)
    }
    return callback(new Error("Only accept PNG/JPEG"), false)
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 * 1
    }
}, multerFilter)
middleware = upload.single("content")

module.exports = middleware