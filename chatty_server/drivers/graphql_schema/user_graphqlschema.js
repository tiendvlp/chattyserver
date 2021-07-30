const { makeExecutableSchema } = require('graphql-tools')
const { BigIntResolver, JSONResolver } = require('graphql-scalars')

const getUserByEmailUseCase = require('../../user/finduser_byemail_usecase')
const { ApolloError, AuthenticationError } = require('apollo-server')
const { GraphQLError } = require('graphql')

const typeDefs = `
    scalar BigInt
    scalar JSON

    type Query {
        getMyUser : User,
        getUserByEmail (email: String!): User
    }

    type User {
        id: String!,
        email: String!,
        name: String!,
        avatar: String!
    }
`


const queryResolvers = {
    BigInt: BigIntResolver,
    JSON: JSONResolver,

    Query: {
        getUserByEmail: function(_, { email }) {
            return new Promise((resolve, reject) => {
                return getUserByEmailUseCase.execute(email, function(err, result) {
                    if (err) { return reject(new ApolloError(err.message, "502")) }
                    if (!result) { return reject(new ApolloError("Can not found user", "404")) }
                    return resolve(result)
                })
            })
        },
        getMyUser: function(_, {}, request) {
            return new Promise((resolve, reject) => {
                return getUserByEmailUseCase.execute(request.account.email, function(err, result) {
                    if (err) { return reject(new ApolloError(err.message, "502")) }
                    if (!result) { return reject(new ApolloError("Can not found user", "404")) }
                    return resolve(result)
                })
            })
        }
    }
}

const userExcutableSchema = makeExecutableSchema({
    typeDefs,
    resolvers: queryResolvers
})

module.exports = {
    executableSchema: userExcutableSchema,
    typeDefs: typeDefs,
    resolver: queryResolvers
}