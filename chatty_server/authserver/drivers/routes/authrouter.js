const express = require('express')
const router = new express.Router()
const loginMiddleware = require('../middleware/login')
const registerMiddleware = require('../middleware/register')
const logoutMiddleware = require('../middleware/logout')

router.post("/login", loginMiddleware )
router.post("/register", registerMiddleware)
router.post("/logout", logoutMiddleware)

module.exports = router