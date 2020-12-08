const firebaseAdmin = require('firebase-admin')
const accountService = require('../service_account.json')

function init () {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(accountService),
        databaseURL: "https://chatible-c85d4.firebaseio.com"
      })
}

function get () {
    return firebaseAdmin
}

module.exports = {
    get,
    init
}