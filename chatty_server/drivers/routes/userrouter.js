const express = require('express')
const router = new express.Router()
const createUserMiddleware = require('../middleware/createuser_middleware')
const authMiddleware = require('../middleware/verifyauth_middleware')

router.post('/newuser', authMiddleware, createUserMiddleware)

module.exports = router