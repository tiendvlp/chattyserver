// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const {stitchSchemas} = require('graphql-tools')
const {scalarSchema} = require('graphql-scalars')
const channelGraphQlSchema = require('../drivers/graphql_schema/channel_graphqlschema')
const messageGraphQlSchema = require('../drivers/graphql_schema/message_graphqlschema')
const userGraphQlSchema = require('../drivers/graphql_schema/user_graphqlschema')

let schema = stitchSchemas({
    subschemas: [ channelGraphQlSchema.executableSchema, messageGraphQlSchema.executableSchema, userGraphQlSchema.executableSchema]
})

// const { ApolloServer, gql } = require('apollo-server');
// const server = new ApolloServer({schema});

// // The `listen` method launches a web server.
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

const express =  require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express')

const app = express();
const server = new ApolloServer({schema });
server.applyMiddleware({app:app})
// bodyParser is needed just for POST.
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }));

app.listen(5000);

app.use('/', function (req, res, next) {
    return res.send()
})

