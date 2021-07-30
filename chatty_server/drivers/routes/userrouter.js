const express = require('express')
const router = new express.Router()
const createUserMiddleware = require('../middleware/createuser_middleware')
const authMiddleware = require('../middleware/verifyauth_middleware')
const userAvatarUseCase = require('../../user/uploaduseravatar_usecase')
const upToTemp = require('../middleware/uploadresource_totemp_middleware')
const upToDb = require('../middleware/uploadresource_fromtemptodb_middleware')
const validateAvatar = require('../middleware/validate_useravatarsrc_middleware')
const getResourceDimensions = require('../middleware/get_resourcedimension_middleware')
const db = require('../../data/mongodb/ConnectMongodb')
const findUserByEmailUseCase = require('../../user/finduser_byemail_usecase')
const compressImgMiddleware = require('../middleware/compressimg_middleware')

router.post('/newuser', authMiddleware, createUserMiddleware)
router.post('/avatar/change', authMiddleware, upToTemp, getResourceDimensions, validateAvatar, compressImgMiddleware, upToDb, function(req, res, next) {
    userAvatarUseCase.execute(req.account.email, req.resource.fileName, function(err) {
        if (err) { return res.status(500).json({ message: "Internal error", err: err }) }
        return res.status(200).json({ message: "Change avatar success" })
    })
})
router.get('/avatar/download/:useremail', function(req, res, next) {
    findUserByEmailUseCase.execute(req.params.useremail, function(err, result) {
        if (err) return res.status(500).json({ message: "internal server error", err: err }).end()
        if (!result) { return res.status(404).json({ message: "User not found" }).end() }
        db.getBucket().openDownloadStreamByName(result.avatar).pipe(res)
            // res.download("temp/media/" + result.avatar)
    })
})
module.exports = router