const express = require('express')
const router = new express.Router()
const multer = require('multer')
const db = require('../../data/mongodb/ConnectMongodb')
const upImgStoryUsecase = require('../../story/upimgstoryusecase')
const authValidatorMiddleware = require('../middleware/verifyauth')
const upImageStoryReqValidatorMiddleware = require('../validator/upstoryimgreqvalidator')
const crypto = require('crypto')

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, './temp/');
    },
    filename: function(req, file, callback) {
        crypto.randomBytes(16, (err, buf) => {
        if (err) {
            return callback(err, false)
        }
        const filename = buf.toString("hex")+"_"+(file.originalname.replace(/\s/g,''))
        console.log("crypto: " +filename)
        return callback(null, filename)
        });
    }
});

const multerFilter = function (req, file, callback) {
    if (file.minetype === "image/png" || file.minetype === "image/jpeg") {
        return callback(null, true)
    }
    return callback(new Error("Only accept PNG/JPEG"), false)
}

function init () {
    const upload = multer({storage: storage, limits: {
        fileSize: 1024*1024*1}},multerFilter)
    
        router.post ('/newimgstory',authValidatorMiddleware, upload.single("content"), upImageStoryReqValidatorMiddleware, function (req, res, next) {
        upImgStoryUsecase.execute(req.account.email, req.body.channelId,{type: req.file.mimetype, imageName: req.file.filename}, function (err) {
                if(err) {return res.status(400).json({message: "failed: " + err})}
                return res.status(200).json({message: "success"})
         })
    })
}

module.exports = {
    router, init
}