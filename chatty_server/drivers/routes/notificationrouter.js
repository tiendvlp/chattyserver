const express = require('express')
const registernotification_middleware = require('../middleware/registernotification_middleware')
const router = new express.Router()
const verifiedAuthMiddleware = require('../middleware/verifyauth_middleware')

router.post('/register', verifiedAuthMiddleware, registernotification_middleware)

module.exports = router