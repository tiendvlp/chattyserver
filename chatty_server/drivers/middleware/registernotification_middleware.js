const allow_device_subscribenotification_usecase = require('../../notification/allow_device_subscribenotification_usecase')

module.exports = function (req, res, next) {
    allow_device_subscribenotification_usecase.execute(req.account.email, req.body.fcmDeviceId, function (err) {
        if (err) {
            console.log("register failed")
            return res.status(502).json({message: err}).end()
        }

        console.log("register success")
        return res.status(200).json({message: "Success"}).end()
    })
}