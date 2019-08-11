const express = require('express');
const { createServer } = require('http');
const { makeExecutableSchema } = require('graphql-tools');
const schema = require('./graphql/schema');
const rootValue = require('./graphql/root');
const cors = require('cors');
const bodyParser = require('body-parser');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { ApolloServer } = require('apollo-server-express');

const app = express();
// const server = createServer(app);

const mySchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers: rootValue
});

new SubscriptionServer({ execute, subscribe, schema }, { server: app, path: '/subscriptions' });

const apolloServer = new ApolloServer({ schema: mySchema, subscriptions: {
    onConnect: () => console.log('Connected to websocket'),
  } });

apolloServer.applyMiddleware({ app });
const httpServer = createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

// Allow cross origin request
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    res.send("<h1>Nothing to show here to access the graphiql ui navigate to /graphql </h1>");
});

httpServer.listen(process.env.PORT || 7000, () => {
    console.log(`App Runnning ${apolloServer.graphqlPath}`);
});