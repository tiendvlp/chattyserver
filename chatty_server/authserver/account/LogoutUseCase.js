const db = require('../authdb')

module.exports.execute = function (userEmail, callback) {
    clearRefreshToken(userEmail, callback)
}

function clearRefreshToken (userEmail, callback) {
    let query = {email : userEmail}
    db.get().collection("RefreshToken").deleteMany(query, function (err, result) {
        if (err) return callback (err, false);
        if (!result) return (null, false)
        return callback (null, result)
    })
}