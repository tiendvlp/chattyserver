const express = require('express')
const router = new express.Router()
const db = require('../../data/mongodb/ConnectMongodb')

router.get("/download/:fileName", function (req, res, next) {
    db.getBucket().find({filename: req.params.fileName})
    .toArray((err, files) => {
        if (!files[0] || files.length === 0) {
            return res.status (404).json({
                success: false,
                message: 'No file available'
            })
        }
        db.getBucket().openDownloadStreamByName(req.params.fileName).pipe(res)
    })
})

module.exports = router