const { addSyntheticLeadingComment } = require("typescript");
const db = require('../data/mongodb/ConnectMongodb')
const updateChannelStatus = require('../channelstatus/update_channelstatus_usecase');
const { type } = require("../data/mongodb/story/imagestory/imagestoryschema");

module.exports.execute = function (channelId, inviterEmail, newMemberEmail, callback) {
    var memerEmails = [inviterEmail, newMemberEmail]
    return findMemberData(memerEmails, function (err, result) {
        if (result) {
            return updateStatus(channelId, inviterEmail, newMemberEmail, function (err) {
                if (err) return callback(err)
                return callback(null) 
            })
        }

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
        if (!result || result.length === 0) {return callback(null, false)}
        return callback(null, true)
    })
}

function updateStatus (channelId, senderEmail, senderName, newMemberName) {
    let newStatus = {
        senderEmail : senderEmail,
        description: {
            type: "INVITE_MEMBER",
            content: senderName + " has added " + newMemberName  
        }
    }

    return updateChannelStatus.execute(channelId, "Text", senderName + " has added " + newMemberName, function (err) {

    })
}