const firebaseAdminInstance = require('../common/firebaseadmin_instance')
const db = require('../data/mongodb/ConnectMongodb')
const ObjectID = require('mongodb').ObjectID
module.exports.execute = function (channelId, data) {
    //TODO: Get a channelStatus by its id
    db.get().collection('Channel').findOne({_id: ObjectID(channelId)}, function (err, channel) {
        if (channel) {
            let status = channel.status
            let members = channel.members
            let senderName = members.filter((it) => {return status.senderEmail === it.email})[0].name
            let notification = {title: "", body: ""}
            if (channel.title === "") {
                notification.title = senderName
                notification.body = status.description.content
            } else {
                notification.title = channel.title
                notification.body = status.senderEmail + ": " + status.description.content
            }
            sendNotification(notification,data, members, status.senderEmail)
        }
    })    
}

function sendNotification (notification,data, members, senderEmail) {
    let message = {
        data,
        notification
    };

    // Send a message to devices subscribed to the provided topic.
    members.forEach ((mem) => {
        if (mem.email === senderEmail) {return}
        message.topic = mem._id.toString()
        firebaseAdminInstance.get().messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
    })
}
