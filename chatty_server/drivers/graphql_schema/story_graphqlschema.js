const {makeExecutableSchema} = require('graphql-tools')
const {BigIntResolver} = require('graphql-scalars')

 const typeDefs = `
    scalar BigInt

    type Query {
        getChannelStory (count: Int!, channelId: String!) : [Story]
    }

    type Story {
        id: String,
    }
 `