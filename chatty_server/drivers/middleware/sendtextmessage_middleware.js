const sendTextMessageUsecase = require("../../message/sendtextmessage_usecase")

module.exports = function (req, res, next) {
    sendTextMessageUsecase.execute(req.body,function (err, messageDoc) {
        if (err) return res.status(400).json({message: "send message failed: " + err})
        req.newMessageDoc = messageDoc
        return next()
    })
}