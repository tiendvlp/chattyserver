const channelEntityFactory = function (channelEntityValidator) {
    return (id, title, members, seen, createdDate, latestUpdate, status, admin) => {
        let {error} = channelEntityValidator({id, title, status, members})
        if (error) throw new Error(error)
        return {
            id, title, members, seen, createdDate, latestUpdate, status, admin
        }
    }
}

module.exports = channelEntityFactory
