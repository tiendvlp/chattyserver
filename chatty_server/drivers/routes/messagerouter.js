const express = require('express')
const router = new express.Router()
const sendMessageMiddleware = require('../middleware/sendmessage_middleware')
const verifyauth = require('../middleware/verifyauth_middleware')
const sendMessageReqValidatorMiddleware = require('../validator/sendmessage_req_validator')
const upToTemp = require('../../drivers/middleware/uploadresource_totemp_middleware')
const upToDb = require('../../drivers/middleware/uploadresource_fromtemptodb_middleware')
const validateType = require('../middleware/validate_messagetype_middleware')

router.post("/sendtextmessage/:channelid", verifyauth,sendMessageReqValidatorMiddleware,validateType, sendMessageMiddleware)
router.post("/sendresourcemessage/:channelid", verifyauth, sendMessageReqValidatorMiddleware ,upToTemp, validateType, upToDb, sendMessageMiddleware)

module.exports = router