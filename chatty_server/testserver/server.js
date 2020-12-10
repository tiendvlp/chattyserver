var express = require('express')
const { graphqlHTTP } = require('express-graphql');
var {buildSchema} = require('graphql')
var {makeExecutableSchema, addSchemaLevelResolver} = require('graphql-tools')
var {stitchSchemas} = require('graphql-tools')

let bunchOfChannel = [
    {
        id: 1231233,
        title: "Android devloper",
        numOfMem: 2,
        test: {
            test1: "Tiendang"
        }
    },
    {
        id: 123323,
        title: "Em iu",
        numOfMem: 2
    },
    {
        id: 1233,
        title: "Devlogs",
        numOfMem: 199
    },
    {
        id: 12,
        title: "IOS devloper",
        numOfMem: 6
    }
]

let test1 = makeExecutableSchema ({
    typeDefs: `
    type Query {
        getChannel (count : Int!): [Channel] 
    }

    type Channel {
        id : String,
        title: String,
        numOfMem: Int,
        test: Testing
    }
    
    type Testing {
        test1: String!
    }
    
    `,
    resolvers: {
        Query: {
            getChannel: (_, {count}) => {
            console.log("alo: " + count)
            if (count > bunchOfChannel.length) {throw Error("Out Of bound exception")}
            if (count == -1 || count == bunchOfChannel.length) {
                return bunchOfChannel
            }
            var result = [];
            for (i = 0; i < count; i++) {
                result[result.length]  = bunchOfChannel[i]
            }
    
            return result;
        }
    }
}
})

let test2 = makeExecutableSchema ({
    typeDefs: `
    type Query {
        getMessages (count : Int!): [Message] 
    }

    type Message {
        id : String,
        body: String,
    }`,
    resolvers: {
        Query: {
            getMessages: (_, {count}) => {
                return []
              }
        }
    }
})


let schema = stitchSchemas({
    subschemas: [test1, test2]
})

var app = express()
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(5000, () => console.log("Hello"))