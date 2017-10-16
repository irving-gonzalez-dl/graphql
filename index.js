var express = require('express');
var expressGraphQL = require('express-graphql');


var db = require('./models/db');
var schema = require('./schema');


var app = express();

 app.use('/',expressGraphQL({
     schema:schema,
     graphiql:true
 }));


 app.listen(3000,()=>{ 
    console.log('server running on localhost:3000');
 });