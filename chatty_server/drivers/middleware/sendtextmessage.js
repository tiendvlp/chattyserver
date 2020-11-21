const sendTextMessageUseCase =  require('../../message/SendTextMessageUseCase')

module.exports = function (req, res, next) {
    var account = req.account

    return sendTextMessageUseCase.execute (req.body.body, account.email, req.body.channelId, function (err) {
        if (err) {return res.status(400).json({message: "send message failed"})}
        return res.status(200).json({message : "send message success"})
    })
}