const express = require('express');
const graphHTTP = require('express-graphql');
const schema = require('./schema/cchema');
const rootValue = require('./schema/root');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Allow cross origin request
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/graphql', graphHTTP({
    schema,
    rootValue,
    graphiql: true
}));

app.get('/', (req, res, next) => {
    res.send("<h1>Nothing to show here to access the graphiql ui navigate to /graphql </h1>");
});

app.listen(process.env.PORT || 7000, () => {
    console.log('App Runnning');
});