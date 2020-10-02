let userEntityFactory = function (validator) {
    return (id, email, name, avatarName, avatarColor, channelIds) => {
        let (error) = validator({id, email, name, avatarName, avatarColor, channelIds}) 
        if (error) throw error
        return {
            getId : () => id,
            getEmail : () => email,
            getName : () => name,
            getAvatarName : () => avatarName,
            getAvatarColor : () => avatarColor,
            getChannelIds : () => channelIds
        }
    }
}
module.exports = userEntityFactory

