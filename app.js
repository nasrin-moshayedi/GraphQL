const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require('express-graphql'); //middleware
const mongoose = require("mongoose");
const graphQLSchema = require('./graphQL/schema');
const graphQLResolvers = require('./graphQL/resolvers');


const app = express();
// const events = [];

app.use(bodyParser.json());


app.use('/graphql', graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql:true
}));
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@lyricaldb.lnaot.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority` )
    .then(() => {
        console.log("true");
        app.get('/', (req, res, nex) => {
            res.send("hello world")
        });
        app.listen(400);
    }).catch(err => {
    console.log(err)
});

