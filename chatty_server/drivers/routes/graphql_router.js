const { graphqlHTTP } = require('express-graphql');
const {makeExecutableSchema} = require('graphql-tools')
const {stitchSchemas} = require('graphql-tools')
const {scalarSchema} = require('graphql-scalars')
const channelGraphQlSchema = require('../graphql_schema/channel_graphqlschema')
const messageGraphQlSchema = require('../graphql_schema/message_graphqlschema')
const userGraphQlSchema = require('../graphql_schema/user_graphqlschema');
const { ApolloError, AuthenticationError } = require('apollo-server');

let schema = stitchSchemas({
    subschemas: [ channelGraphQlSchema.executableSchema, messageGraphQlSchema.executableSchema, userGraphQlSchema.executableSchema]
})

module.exports = graphqlHTTP({
    schema, 
    graphiql: true,
    customFormatErrorFn: function (error) {
        if (!error.code) {
            return error
        }
        return {message: error.message, code: parseInt(error.extensions.code)}
    }
})