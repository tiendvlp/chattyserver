const channelEntityFactory = function (channelEntityValidator) {
    return (id, title, members, seen, createdDate, latestUpdate, status, admin) => {
        let {error} = channelEntityValidator({id, title, status, members, seen, latestUpdate, createdDate, admin})
        if (error) throw new Error(error)
        return {
            id: id, title, members, seen, createdDate, latestUpdate, status, admin
        }
    }
}

module.exports = channelEntityFactory
