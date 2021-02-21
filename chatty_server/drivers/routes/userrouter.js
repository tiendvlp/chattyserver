const express = require('express')
const router = new express.Router()
const createUserMiddleware = require('../middleware/createuser_middleware')
const authMiddleware = require('../middleware/verifyauth_middleware')
const userAvatarUseCase = require('../../user/uploaduseravatar_usecase')
const upToTemp = require('../middleware/uploadresource_totemp_middleware')
const upToDb = require('../middleware/uploadresource_fromtemptodb_middleware')
const validateAvatar = require('../middleware/validate_useravatarsrc_middleware')
const getResourceDimensions = require('../middleware/get_resourcedimension_middleware')

router.post('/newuser', authMiddleware, createUserMiddleware)
router.post('/changeUserAvatar', authMiddleware, upToTemp, getResourceDimensions, validateAvatar, upToDb, function (req, res, next) {
    userAvatarUseCase.execute(req.account.email, req.resource.fileName, function (err) {
        if (err) {return res.status(500).json({message: "Internal error", err: err})}
        return res.status(200).json({message: "Change avatar success"})
    })
})

module.exports = router