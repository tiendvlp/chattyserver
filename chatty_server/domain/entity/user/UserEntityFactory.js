let userEntityFactory = function (validator) {
    return (id, email, name, avatar) => {
        let {error} = validator({id, email, name, avatar}) 
        if (error) throw error
        return {
            id,
            email,
            name,
            avatar
        }
    }
}
module.exports = userEntityFactory

