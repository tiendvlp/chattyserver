const createChannelUseCase = require('../../channel/CreateChannelUseCase')

module.exports = function (req, res, next)  {
    createChannelUseCase.execute(createChannelUseCase.param(req.body.channelData.memberEmails[0], req.body.channelData.memberEmails, req.body.firstMessage.body), function (err) {
        if (err) {return res.status("400").json({message: "create channel failed with error: " + err}).end()}
        return res.status(200).json({message: "Create channel successfully"}).end()
    });
}