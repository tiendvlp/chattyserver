const { makeExecutableSchema } = require('graphql-tools')
const { BigIntResolver, JSONResolver } = require('graphql-scalars')
const getUserObservedChannelId = require('../../channel/get_userobservedchannelid_usecase')
const getPreviousUserChannelUseCase = require('../../channel/get_previoususerchannel_withcount_usecase')
const getUserChannelFromTimeToTimeUseCase = require('../../channel/get_userchannel_overperiod_usecase')

const { ApolloError } = require('apollo-server')

const typeDefs = `
    scalar BigInt
    scalar JSON

    type Query {
        getPreviousChannels (lastUpdate: BigInt!,count: Int!): [Channel],
        getChannelsOverPeriodOfTime (from: BigInt!, to: BigInt!): [Channel],
        getUserObservedChannelId : [String]
    }

    type Channel {
        id: String!,
        title: String!,
        admin: String!, 
        status: Status!,
        members: [ChannelMember]!,
        seen: [String]!,
        createdDate: BigInt!,
        latestUpdate: BigInt!
    }

    type Status {
        senderEmail: String!,
        type: String!,
        content: String!
    }
    type ChannelMember {
        id: String!,
        email: String!,
    } 

`

const queryResolvers = {
    BigInt: BigIntResolver,
    JSON: JSONResolver,
    Query: {
        getPreviousChannels: function(_, { lastUpdate, count }, request) {
            return new Promise((resolve, reject) => {
                let userEmail = request.account.email
                return getPreviousUserChannelUseCase.execute(userEmail, lastUpdate, count, function(err, result) {
                    if (err) { return reject(new ApolloError(err.message, "502")) }
                    if (!result) { return reject(new ApolloError("Channel not found", "404")) }
                    return resolve(result)
                })
            })
        },
        getChannelsOverPeriodOfTime: function(_, { from, to }, request) {
            return new Promise((resolve, reject) => {
                let userEmail = request.account.email
                console.log("GetChannelOverPeriodOfTimes: " + userEmail)
                return getUserChannelFromTimeToTimeUseCase.execute(userEmail, from, to, function(err, result) {
                    if (err) { return reject(new ApolloError(err.message, "502")) }
                    if (!result) { return reject(new ApolloError("Channel not found", "404")) }
                    return resolve(result)
                })
            })
        },
        getUserObservedChannelId: function(_, {}, request) {
            return new Promise((resolve, reject) => {
                getUserObservedChannelId.execute(request.account.email, function(err, result) {
                    if (err) { return reject(new ApolloError(err.message, "502")) }
                    return resolve(result)
                })
            })
        }
    },
}

const channelExcutableSchema = makeExecutableSchema({
    typeDefs,
    resolvers: queryResolvers
})

module.exports = {
    executableSchema: channelExcutableSchema,
    typeDefs: typeDefs,
    resolver: queryResolvers
}