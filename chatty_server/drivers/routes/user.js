const express = require('express')
const router = new express.Router()
const createUserMiddleware = require('../middleware/createuser')
const authMiddleware = require('../middleware/verifyauth')

router.post('/newuser', authMiddleware, createUserMiddleware)

module.exports = router