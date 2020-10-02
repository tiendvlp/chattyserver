let accountEntityFactory = function (validator) {
    return (id, email, password, isEmailVerified, date) => {
         let {error} = validator ({id, email, password, isEmailVerified, date})
         if (error) throw new Error(error)
         return {
             getEmail : () => email,
             getId : () => id,
             getIsEmailVerified : () => isEmailVerified,
             getPassword : () => password,
             getCreatedDate : () => date
         }
    }
}

module.exports = accountEntityFactory