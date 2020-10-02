let channelEntityFactory = function (channelEntityValidator) {
    return (id, title, memberIds) => {
        let {error} = channelEntityValidator({id, title, memberIds})
        if (error) throw new Error(error)
        return {
            getChannelId : () => id,
            getChannelTitle : () => title,
            getMemberIds : () => memberIds
        }
    }
}

module.exports = channelEntityFactory
