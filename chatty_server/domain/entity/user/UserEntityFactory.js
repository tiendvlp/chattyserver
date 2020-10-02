let userEntityFactory = function (validator) {
    return (id, email, name, avatar, channelIds) => {
        let {error} = validator({id, email, name, avatar, channelIds}) 
        if (error) throw error
        return {
            getId : () => id,
            getEmail : () => email,
            getName : () => name,
            getAvatar : () => avatar,
            getChannelIds : () => channelIds
        }
    }
}
module.exports = userEntityFactory

