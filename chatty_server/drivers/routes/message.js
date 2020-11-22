const express = require('express')
const router = new express.Router()
const sendTextMessageMiddleware = require('../middleware/sendtextmessage')
const verifyauth = require('../middleware/verifyauth')
const sendTextMessageReqValidatorMiddleware = require('../validator/sendtextmessagereqvalidator')

router.post("/sendtextmessage", verifyauth,sendTextMessageReqValidatorMiddleware, sendTextMessageMiddleware)
module.exports = router