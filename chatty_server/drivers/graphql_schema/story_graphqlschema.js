const {makeExecutableSchema} = require('graphql-tools')
const {BigIntResolver} = require('graphql-scalars')

const getPreviousChannelStoryWithCount = require('../../story/getprevious_userrelatedstory_withcount_usecase')
const getStoryOverPeriodOfTime = require('../../story/getuserrelatedstory_overperiod_usecase')
const { ApolloError } = require('apollo-server')

const typeDefs = `

    scalar BigInt

    type Query {
        getPreviousStoryWithCount (since: BigInt!, count: Int!): [Story],
        getStoryOverPeriodOfTime (from: BigInt!, to: BigInt!): [Story]
    }

    type Story {
        id: String!,
        type: String!,
        content: String!,
        uploadedDate: String!,
        outdatedDate: BigInt!,
        owner: String!,
        channelId: String!
    }
`


const resolvers = {
    BigInt: BigIntResolver,

    Query: {
        getPreviousStoryWithCount (_, {since,count}) {
            return new Promise ((resolve, reject) => {
                let userEmail = "mingting15@mintin.com"
                getPreviousChannelStoryWithCount.execute(userEmail,since, count, function (err, result) {
                if (err) {return reject(new ApolloError(err.message, "502"))}
                if (!result) {return reject(new ApolloError('can not load your story', "404"))}

                return resolve(result)
                })
            })
        },
        getStoryOverPeriodOfTime (_, {from, to}) {
            return new Promise ((resolve, reject) => {
                let userEmail = "mingting15@mintin.com"
                getStoryOverPeriodOfTime.execute(userEmail,from, to, function (err, result) {
                if (err) {return reject(new ApolloError(err.message, "502"))}
                if (!result) {return reject(new ApolloError('can not load your story', "404"))}

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