const {makeExecutableSchema} = require('graphql-tools')
const getUserChannelUseCase = require('../../channel/get_userlatestupdatechannel_usecase') 
const {BigIntResolver} = require('graphql-scalars')

const typeDefs = `
    scalar BigInt
    
    type Query {
        getChannels (count: Int!, userEmail: String!): [Channel]
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
        name: String!
    } 
`


const queryResolvers = {
    BigInt: BigIntResolver,
    
    Query: {
        getChannels: function (_, {count, userEmail}) {
            return new Promise((resolve, reject ) => {
                return getUserChannelUseCase.execute(userEmail,count, function (err, result) {
                    if (err) {return reject(err)}
                    if (!result) {return reject(Error("404 not found"))}
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