const { graphqlHTTP } = require('express-graphql');
const {makeExecutableSchema} = require('graphql-tools')
const {stitchSchemas} = require('graphql-tools')
const {scalarSchema} = require('graphql-scalars')
const channelGraphQlSchema = require('../graphql_schema/channel_graphqlschema')


let schema = stitchSchemas({
    subschemas: [ channelGraphQlSchema.executableSchema]
})

module.exports = graphqlHTTP({
    schema, 
    graphiql: true
})

