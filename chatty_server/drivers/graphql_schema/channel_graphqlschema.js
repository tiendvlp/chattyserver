const {makeExecutableSchema} = require('graphql-tools')
const {BigIntResolver, JSONResolver} = require('graphql-scalars')

const getUserChannelUseCase = require('../../channel/get_userlatestupdatechannel_usecase') 
const { ApolloError } = require('apollo-server')

const typeDefs = `
    scalar BigInt
    scalar JSON

    type Query {
        getChannels (lastUpdate: BigInt!,count: Int!): [Channel]
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
        description: Description!
    }

    type Description {
        type: String!,
        content: String!
    }

    type ChannelMember {
        id: String!,
        email: String!,
        name: String!,
        avatar: ChannelMemberAvatar!
    } 

    type ChannelMemberAvatar {
        type: String!,
        content: JSON
    }
`

const queryResolvers = {
    BigInt: BigIntResolver,
    JSON: JSONResolver,
    Query: {
        getChannels: function (_, {lastUpdate, count}, request) {
            return new Promise((resolve, reject ) => {
                let userEmail = request.account.email
                console.log("olalal" + lastUpdate)
                return getUserChannelUseCase.execute(userEmail,lastUpdate, count, function (err, result) {
                    if (err) {return reject(new ApolloError(err.message, "502"))}
                    if (!result) {return reject(new ApolloError("Channel not found", "404"))}
                    return resolve(result)
                })
            })
        }
    },
}

const channelExcutableSchema = makeExecutableSchema ({
    typeDefs,
    resolvers: queryResolvers
})

module.exports = {
    executableSchema : channelExcutableSchema,
    typeDefs: typeDefs,
    resolver: queryResolvers
}