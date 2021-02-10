const sendMessageUseCase = require("../../message/sendmessage_usecase")

module.exports = function (req, res, next) {
    if (!req.account) {return res.status(401).json({message: "UnAuthorization"})}
    return sendMessageUseCase.execute(req.message.body, req.account.email, req.message.channelId,req.message.type, req.message.content, function (err, messageDoc) {
        if (err) return res.status(502).json({message: "send message failed: " + err})
        req.newMessageDoc = messageDoc
        return res.status(200).json({message: "Send message success"}).end()
    })
}