let storyEntityFactory = function (storyEntityValidator) {
    return (id,owner, channelId,  content, type , uploadedDate ,outdatedDate) => {
        let {error} = storyEntityValidator({id , owner, content, type, channelId , uploadedDate , outdatedDate})
        if (error) throw new Error(error)
        return {
            id,
            content,
            type,
            uploadedDate,
            outdatedDate,
            owner,
            channelId
        }
    }
}

module.exports = storyEntityFactory