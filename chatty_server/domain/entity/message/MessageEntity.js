let messageEntityFactory = function (messageEntityValidator) {
    return (
        id , messageBody, senderId, channelId , sent , senderInfo) => {
        let {error} = messageEntityValidator({id , messageBody, senderId, channelId , sent , senderInfo})
        if (error) throw new Error(error)
        return {
            getId: () => id,
            getMessageBody: () => messageBody,
            getSender: () => senderId,
            getChannelId: () => channelId,
            getSent: () => sent,
            getSenderInfo: () => senderInfo
        }
    }
}

module.exports = messageEntityFactory