const db = require('../data/mongodb/ConnectMongodb')
const mongo = require('mongodb')
const sendTextMessageUsecase = require("../message/sendmessage_usecase")

module.exports.execute = function (adminEmail,memberEmails, firstMessage, callback) {
    memberEmails[memberEmails.length] = adminEmail
    return findCompactUsers(memberEmails, function (err, result) {
        if(result.length <= 0) {return callback(new Error("Your userIds is invalid"))}
        if (err) return callback(err)
        if (!result) return callback(result)
        let compactUsers = result
        return createNewChannel(adminEmail,compactUsers, function (err,channelId) {
            if (err) {return callback(err)}
            return sendFirstMessage(adminEmail,firstMessage,channelId, function (err) {
                if (err) {rollback(channelId); return callback(err);} 
                addChannelToUserObservableList(compactUsers, channelId)
                return callback(null)
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
        _id : 1,
        email : 1,
        name : 1
    }

    db.get().collection("User").find(query, normalize).toArray(function(err, result) {
        if (err) return callback(err, false)
        if (!result) return callback(null, false)
        console.log("compact user result: " + result)
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
            
        },
        members : members,
        seen: [admin],
        createdDate: new Date().getTime(),
        latestUpdate: new Date().getTime(),
    }

    db.get().collection("Channel").insertOne(newChannel, function (err, result) {
        if (err) return callback(err, null)
        console.log("Inserted Channel id: " + result.ops[0]._id)
        return callback(null, result.ops[0]._id)
    })
}

function sendFirstMessage (adminEmail,firstMessage, channelId, callback) {
    return sendTextMessageUsecase.execute(firstMessage.body,adminEmail, channelId, function (err) {
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