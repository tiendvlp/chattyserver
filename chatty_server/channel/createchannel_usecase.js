const db = require('../data/mongodb/ConnectMongodb')
const mongo = require('mongodb')
const sendTextMessageUsecase = require("../message/sendmessage_usecase")

module.exports.execute = function (adminEmail,memberEmails, firstMessage, callback) {
    memberEmails[memberEmails.length] = adminEmail
    console.log("admin email la: " + adminEmail)
    return findCompactUsers(memberEmails, function (err, result) {
        if(result.length !== memberEmails.length) {console.log("different size"); return callback(new Error("Your userIds is invalid"), false)}
        if (err) return callback(err, false)
        if (!result) return callback(new Error("Internal error"), false)
        let compactUsers = result
        return createNewChannel(adminEmail,compactUsers, function (err,channel) {
            if (err) {return callback(err, false)}
            return sendFirstMessage(adminEmail,firstMessage,channel._id.toString(), function (err) {
                if (err) {rollback(channel._id.toString()); return callback(err, false);} 
                addChannelToUserObservableList(compactUsers, channel._id.toString())
                return callback(null, channel)
            })
        })
    })
}

// User need to know what channel they are observing
function addChannelToUserObservableList (users, channelId) {
    const collection = db.get().collection ('UserObservedChannel')
    users.forEach(function (user, i) {
        collection.updateOne({userEmail: user.email}, {$push: {observedChannel: channelId} },{ upsert : true })
    })
}

function findCompactUsers (memberEmails, callback) {
    let query = {email : {$in : memberEmails}}
    let normalize = {
        _id: 1,
        email : 1,
        name : 1,
        avatar: 0
    }

    db.get().collection("User").find(query, normalize).toArray(function(err, result) {
        if (err) return callback(err, false)
        if (!result) return callback(null, false)
        console.log("compact user result: " + result[0].avatar)
        return callback(null, result) 
    })
}

function createNewChannel (admin, compactUsers, callback) {
    let title = ""
    compactUsers.forEach(user => {
        title += user.name + ","
    }); 

    let members = []

    compactUsers.forEach(user => {
        members[members.length] = user.email
    })

    title = title.substr(0, title.length-1)
    let newChannel = {
        title : title,
        admin: admin,
        status : {
            senderEmail: admin,
            description: {
                type: "text",
                content: "new message"
            }
        },
        members : compactUsers,
        seen: [admin],
        createdDate: new Date().getTime(),
        latestUpdate: new Date().getTime(),
    }

    db.get().collection("Channel").insertOne(newChannel, function (err, result) {
        if (err) return callback(err, null)
        console.log("Inserted Channel id: " + result.ops[0]._id)
        return callback(null, result.ops[0])
    })
}

function sendFirstMessage (adminEmail,firstMessage, channelId, callback) {
    return sendTextMessageUsecase.execute(adminEmail, channelId, "text", firstMessage.body, function (err) {
        if (err) return callback(err)
        return callback(null)
    })
}

// to make sure everything is all success or all failed
function rollback (createdChannelId) {
    // clear createdChannel
    db.get().collection("Channel").deleteOne({_id: new mongo.ObjectID(createdChannelId)}, function (err) {
        console.log("ROLLING BACK DUE TO FAILED IN CREATING NEW CHANNEL !")
    })
}