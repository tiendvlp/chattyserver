const {makeExecutableSchema} = require('graphql-tools')
const {BigIntResolver} = require('graphql-scalars')

const getPreviousChannelMessageWithCount = require('../../message/get_previouschannelmessage_withcount_usecase')
const getMessagesOverPeriodOfTime = require('../../message/get_channelmessage_overperiod_usecase')
const { ApolloError } = require('apollo-server')

const typeDefs = `

    scalar BigInt

    type Query {
        getPreviousMessageWithCount (since: BigInt!, count: Int!, channelId: String!): [Message],
        getMessageOverPeriodOfTime (from: BigInt!, to: BigInt!, channelId: String!): [Message]
    }

    type Message {
        id: String!,
        type: String!,
        content: String!,
        senderEmail: String!,
        createdDate: BigInt!,
        channelId: String!
    }
`


const resolvers = {
    BigInt: BigIntResolver,

    Query: {
        getPreviousMessageWithCount (_, {since,count, channelId}) {
            return new Promise ((resolve, reject) => {
                getPreviousChannelMessageWithCount.execute(channelId,since, count, function (err, result) {
                if (err) {return reject(new ApolloError(err.message, "502"))}
                if (!result) {return reject(new ApolloError('can not load your messages', "404"))}

                return resolve(result)
                })
            })
        },
        getMessageOverPeriodOfTime (_, {from, to, channelId}) {
            return new Promise ((resolve, reject) => {
                getMessagesOverPeriodOfTime.execute(channelId, from, to, function (err, result) {
                if (err) {return reject(new ApolloError(err.message, "502"))}
                if (!result) {return reject(new ApolloError('can not load your messages', "404"))}

                return resolve(result)
            })
        })
    }
    }
}

const executableSchema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
})

module.exports = {
    executableSchema: executableSchema,
    typeDefs: typeDefs,
    resolvers: resolvers
}