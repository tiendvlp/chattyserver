const sendMessageUseCase = require("../../message/sendmessage_usecase")
const sendNotificationUseCase = require('../../notification/send_channelstatuschanged_notification_usecase')

module.exports = function(req, res, next) {
    if (!req.account) { return res.status(401).json({ message: "UnAuthorization" }) }
    return sendMessageUseCase.execute(req.account.email, req.message.channelId, req.message.type, req.message.content, function(err, messageDoc) {
        if (err) { return res.status(502).json({ message: "send message failed: " + err }) }
        req.newMessageDoc = messageDoc
        messageDoc._id = messageDoc._id.toString()
        messageDoc.channelId = messageDoc.channelId.toString()

        let notificationData = {
            type: "newMessage",
            channelId: req.message.channelId,
            messageType: messageDoc.type,
            messageId: messageDoc._id,
            messageContent: messageDoc.content,
            senderEmail: messageDoc.senderEmail,
            sendDate: messageDoc.createdDate.toString()
        }
        sendNotificationUseCase.execute(req.message.channelId, notificationData, "newMessage", messageDoc)
        return res.status(200).json({ message: "Send message success", data: messageDoc }).end()
    })
}