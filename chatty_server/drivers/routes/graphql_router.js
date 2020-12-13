const { graphqlHTTP } = require('express-graphql');
const {makeExecutableSchema} = require('graphql-tools')
const {stitchSchemas} = require('graphql-tools')
const {scalarSchema} = require('graphql-scalars')
const channelGraphQlSchema = require('../graphql_schema/channel_graphqlschema')
const messageGraphQlSchema = require('../graphql_schema/message_graphqlschema')

let schema = stitchSchemas({
    subschemas: [ channelGraphQlSchema.executableSchema, messageGraphQlSchema.executableSchema]
})

module.exports = graphqlHTTP({
    schema, 
    graphiql: true
})

