const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./graphQL/schema/schema');
console.log("helloo")

const app = express();
const MongoClient = require('mongodb').MongoClient;
console.log("helloo")
// const uri = "";
const uri = "mongodb+srv://lyricaldb.lnaot.mongodb.net/myFirstDatabase --username Nasrin";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});
// Replace with your mongoLab URI
// const MONGO_URI = "mongodb://Nasrin:123123Nasrin@lyricaldb.lnaot.mongodb.net/Songs?retryWrites=true&w=majority";
// const MONGO_URI = "mongodb://Nasrin:123123Nasrin@lyricaldb.lnaot.mongodb.net/lyricaldb";
if (!uri) {
    console.log('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/users_test');
mongoose.connect(uri).then(r => console.log("dfg")).catch(e => console.log("eeeee"));

mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
