let messageEntityFactory = function (messageEntityValidator) {
    return (id , channelId, content, type , createdDate , senderEmail) => {
        let {error} = messageEntityValidator({id , content, type, channelId , createdDate , senderEmail})
        if (error) throw new Error(error)
        return {
            id,
            content,
            type,
            createdDate,
            senderEmail,
            channelId
        }
    }
}

module.exports = messageEntityFactory