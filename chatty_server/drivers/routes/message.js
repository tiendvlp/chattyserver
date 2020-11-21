const express = require('express')
const router = new express.Router()
const sendtextmessagemiddleware = require('../middleware/sendtextmessage')
const authMiddleware = require('../middleware/verifyauth')

router.post('/sendtextmessage', authMiddleware, sendtextmessagemiddleware)

module.exports = router