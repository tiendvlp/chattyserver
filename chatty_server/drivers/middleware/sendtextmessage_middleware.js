const sendTextMessageUsecase = require("../../message/sendtextmessage_usecase")

module.exports = function (req, res, next) {
    sendTextMessageUsecase.execute(req.body,function (err) {
        if (err) return res.status(400).json({message: "send message failed: " + err})       
        return res.status(200).json({message: "sending message success"})
    })
}