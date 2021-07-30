const logoutusecase = require('../../account/logout_usecase')

module.exports = function (req, res, next) {
    if (!req.body.fcmId) {return res.status(400).json({messasge: "fcmId is required"}).end()}
    return logoutusecase.execute(req.body.email,req.body.fcmId, function (err, result) {
        if (err) return res.status(400).json({message: "Logout failed"})
        // after sigh out success, we remove the fcm id out of redis


        return res.status(200).json ({message: "Logout Sucess"})
    })
}