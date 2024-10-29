const express = require('express');
const {ApolloServer} = require('@apollo/server');
const {expressMiddleware} = require('@apollo/server/express4');
const bosyParser = require('body-parser');
const cors = require('cors');
const { query } = require('express');

async function startServer() {
    const app =express();
    const server = new ApolloServer({
        typeDefs: `
        type Book {
        id: ID!
        title: String!
        }
        
        type Query {
        books: [Book]
        }
        `,
        

        resolvers: {
            Query: {
                books: () => [
                    {id: 1, title: "Anything"},
                ],
            }
        }
    });

    app.use(bosyParser.json());
    app.use(cors());

    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => console.log("server started at PORT 8000"));
    
}

startServer();