const createChannelUsecase = require('../../channel/createchannel_usecase')
const sendNotification = require('../../notification/send_channelstatuschanged_notification_usecase')

module.exports = function(req, res, next) {
    createChannelUsecase.execute(req.account.email, req.body.channelData.memberEmails, req.body.firstMessage, function(err, result) {
        if (err) return res.status(502).json({ message: "Create channel failed" })
        let data = {
            type: "newChannel",
            channelId: result._id.toString()
        }

        let socketData = result
        socketData._id = socketData._id.toString()
        sendNotification.execute(result._id, data, "newChannel", socketData)
        return res.status(200).json({ message: "Create channel successfully !", data: result })
    })
}