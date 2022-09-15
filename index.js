const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const MONGODB = process.env.MONGODB;

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});

mongoose.connect(MONGODB, { useNewUrlParser: true})
    .then(res => {
        console.log('MongoDB connected!');
        server.listen({ port: 8080})
            .then(res => {
                console.log(`Server running at ${res.url}`)
            });
        });