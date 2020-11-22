const createChannelUsecase = require('../../channel/CreateChannelUsecase')

module.exports = function (req, res, next) {
    createChannelUsecase.execute(req.account.email,req.body.channelData.memberEmails, req.body.firstMessage, function (err) {
        if (err) return res.status(400).json({message: "Create channel failed"})
        return res.status(200).json({message: "Create channel successfully !"})
    })
}