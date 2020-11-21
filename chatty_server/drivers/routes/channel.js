const express = require('express')
const router = new express.Router()
const createChannelMiddleware = require('../middleware/createchannel')
const authMiddleware = require('../middleware/verifyauth')

router.post('/newchannel', authMiddleware, createChannelMiddleware)

module.exports = router