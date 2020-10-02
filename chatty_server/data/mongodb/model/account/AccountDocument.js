let accountDocumentFactory = function (validator) {
    return (email, password, isEmailVerified, dateInMillisecond) => {
         let {error} = validator ({email, password, isEmailVerified, dateInMillisecond})
         if (error) throw new Error(error)
         return {
             getEmail : () => email,
             getPassword : () => password,
             getJson : () => {return {
                email : email,
                password : password,
                isEmailVerified: isEmailVerified,
                createdDate: dateInMillisecond}
             }
         }
    }
}

module.exports = accountDocumentFactory