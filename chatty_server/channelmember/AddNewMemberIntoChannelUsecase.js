const { addSyntheticLeadingComment } = require("typescript");
const db = require('../data/mongodb/ConnectMongodb')

module.exports = function (channelId, inviterEmail, newMemberEmail) {
    findMemberData(channelId, function (err, result) {
        
    })
}

function findMemberData (memberEmail, callback) {
    let normalize = {
        _id: 1,
        email: 1,
        avatar: 1,
        name: 1
    }
    db.get().collection('User').find({email: memberEmail},normalize, function (err, result) {
        if (err) {return callback(err, false)}
        if (!result) {return callback(null, false)}
        return callback(null, result)
    })
}

function updateStatus (channelId, senderEmail, senderName, newMemberName) {
    let newStatus = {
        senderEmail : senderEmail,
        description: {
            type: "Text",
            content: senderName + " has added " + newMemberName  
        }
    }
}