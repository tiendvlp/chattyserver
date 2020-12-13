const {makeExecutableSchema} = require('graphql-tools')
const {BigIntResolver} = require('graphql-scalars')

const getChannelLatestMessageUseCase = require('../../message/get_latestchannelmessage_usecase')

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
                if (err) {return reject(err)}
                if (!result) {return reject(Error('404 can not load your messages'))}

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