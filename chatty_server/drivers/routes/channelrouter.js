const express = require('express')
const router = new express.Router()
const createChannelMiddleware =  require('../middleware/createchannel_middleware')
const verifiedAuthMiddleware = require('../middleware/verifyauth_middleware')
const createChannelReqValidator = require('../validator/createchannel_req_validator')

router.post('/newchannel', verifiedAuthMiddleware,createChannelReqValidator, createChannelMiddleware)
module.exports = router