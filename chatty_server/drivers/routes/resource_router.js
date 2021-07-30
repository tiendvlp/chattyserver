const express = require('express')
const router = new express.Router()
const db = require('../../data/mongodb/ConnectMongodb')

router.get("/download/:fileName", function (req, res, next) {
    db.getBucket().openDownloadStreamByName(req.params.fileName).pipe(res)
})

module.exports = router