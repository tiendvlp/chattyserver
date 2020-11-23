const channelEntityFactory = function (channelEntityValidator) {
    return (id, title, members, seen, createdDate, latestUpdate, status, admin) => {
        let {error} = channelEntityValidator({id, title, memberIds})
        if (error) throw new Error(error)
        return {
            getChannelId : () => id,
            getChannelTitle : () => title,
            getMembers : () => members,
            getStatus : () => status,
            getSeen : () => seen,
            getCreatedDate : ()  => createdDate,
            getLatestUpdate : () => latestUpdate,
            getAdmin : () => admin
        }
    }
}

module.exports = channelEntityFactory
