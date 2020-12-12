const sendTextMessageUsecase = require("../../message/sendtextmessage_usecase")

module.exports = function (req, res, next) {
    if (!req.account) {return res.status(400).json({message: "UnAuthorization"})}
    return sendTextMessageUsecase.execute(req.body.body, req.account.email, req.body.channelId, function (err, messageDoc) {
        if (err) return res.status(400).json({message: "send message failed: " + err})
        req.newMessageDoc = messageDoc
        return res.status(200).json({message: "Send message success"}).end()
    })
}