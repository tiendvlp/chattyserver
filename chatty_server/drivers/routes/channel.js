const express = require('express')
const router = new express.Router()

const createChannelMiddleware =  require('../middleware/createchannel')
const verifiedAuthMiddleware = require('../middleware/verifyauth')
const createChannelReqValidator = require('../validator/createchannelreqvalidator')

router.post('/newchannel', verifiedAuthMiddleware,createChannelReqValidator, createChannelMiddleware)
module.exports = router