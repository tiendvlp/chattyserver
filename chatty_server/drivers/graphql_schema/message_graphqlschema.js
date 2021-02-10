const {makeExecutableSchema} = require('graphql-tools')
const {BigIntResolver} = require('graphql-scalars')

const getChannelLatestMessageUseCase = require('../../message/get_latestchannelmessage_usecase')
const { ApolloError } = require('apollo-server')

const typeDefs = `

    scalar BigInt

    type Query {
        getMessages (count: Int!, channelId: String!): [Message]
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
        getMessages (_, {count, channelId}) {
            return new Promise ((resolve, reject) => {
                getChannelLatestMessageUseCase.execute(channelId, count, function (err, result) {
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