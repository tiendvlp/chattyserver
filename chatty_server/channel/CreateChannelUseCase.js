const db = require('../data/mongodb/ConnectMongodb')
const findUserByEmailUseCase = require("../user/FindUserByEmailUseCase")

const execute = function (param, callback ) {
    const channelDocument = {
        title : "",
        admin : "",
        status : {
            senderEmail : "",
            description : {
                type : "",
                content : {}
            }
        },
        members : [],
        seen : [],
        createdDate : 0,
        latestUpdate : 0
    }

    return findAllMember(param.memberEmails, function (err, memDatas) {
        if (err) {return callback(err)}
        if (!memDatas || memDatas.length == 0 ) {return callback(new Error("There is no members"))}
        
        // create members
        channelDocument.members = memDatas

        // create title
        var i = 0;
        memDatas.forEach(element => {
            if (i === memDatas.length-1) {
                channelDocument.title += element.name
                return
            }            
            channelDocument.title += element.name + ", "
            i++;
        });
        // remove last ',' character
        // channelDocument.title = channelDocument.title.substr(0, channelDocument.title.length-1)

        // init admin
        channelDocument.admin = param.admin

        // init status
        channelDocument.status.senderEmail = param.admin
        channelDocument.status.description.type = "Text"
        channelDocument.status.description.content = param.firstMessage

        // init seen: sender is default seen the message
        channelDocument.seen.push(param.admin)

        // init createdDate
        var currentTime =  new Date().getTime();
        channelDocument.createdDate = currentTime;
        channelDocument.latestUpdate = currentTime;

        return db.get().collection("Channel").insertOne(channelDocument, function (err) {
            if (err) return callback(err)
            return callback(null)
        });
    })    
}

function findAllMember (memberEmails, callback) {
    console.log("huhu: " + memberEmails)
    return db.get().collection("User").find({email: {$in : memberEmails}}).toArray(function (err, users) {
        if (err) {return callback(err, false)}
        if (!users) {return callback(null, false)}
        console.log("Creating_channel_progress find members: " + users.length)
        return callback(null, users)
    })
}

const param = function (admin, memberEmails, firstMessage) {
    return {admin, memberEmails, firstMessage}
}

module.exports = {
    execute : execute,
    param : param
}
