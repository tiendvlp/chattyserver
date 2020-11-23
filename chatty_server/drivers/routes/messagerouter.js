const express = require('express')
const router = new express.Router()
const sendTextMessageMiddleware = require('../middleware/sendtextmessage_middleware')
const verifyauth = require('../middleware/verifyauth_middleware')
const sendTextMessageReqValidatorMiddleware = require('../validator/sendtextmessage_req_validator')

router.post("/sendtextmessage", verifyauth,sendTextMessageReqValidatorMiddleware, sendTextMessageMiddleware)
module.exports = router