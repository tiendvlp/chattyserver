let accountEntityFactory = function (validator) {
    return (email, password, isEmailVerified, date) => {
         let {error} = validator ({email, password, isEmailVerified, date})
         if (error) throw new Error(error)
         return {
             getEmail : () => email,
             getIsEmailVerified : () => isEmailVerified,
             getPassword : () => password,
             getCreatedDate : () => date
         }
    }
}

module.exports = accountEntityFactory