const express = require('express')
const router = new express.Router()
const upStoryUseCase = require('../../story/upstory_usecase')
const verifyauth = require('../middleware/verifyauth_middleware')
const upStoryReqValidator = require('../validator/upstoryimg_req_validator')
const upToTemp = require('../../drivers/middleware/uploadresource_totemp_middleware')
const upToDb = require('../../drivers/middleware/uploadresource_fromtemptodb_middleware')
const validateType = require('../middleware/validate_storytype_middleware')

router.post("/upload/:channelid", verifyauth, upStoryReqValidator ,upToTemp, validateType, upToDb,
     function (req, res, next) {
        if (!req.account) {return res.status(401).json({message: "UnAuthorization"})}
        upStoryUseCase.execute(req.account.email, req.story.channelId, req.story.type, req.story.resourceName, function (err) {
            if (err) {return res.status(500).json({message: "Internal error:", err: err})}
            return res.status(200).json({message: "Success"})
        })     
      }
    )

module.exports = router