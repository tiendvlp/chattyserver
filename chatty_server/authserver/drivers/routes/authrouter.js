const express = require('express')
const router = new express.Router()
const loginMiddleware = require('../middleware/login')
const registerMiddleware = require('../middleware/register')
const logoutMiddleware = require('../middleware/logout')
const generateAccessTokenMiddleware = require('../middleware/generateaccesstoken')

router.post("/login", loginMiddleware )
router.post("/register", registerMiddleware)
router.post("/logout", logoutMiddleware)
router.post('/token/generateaccesstoken', generateAccessTokenMiddleware)
module.exports = router