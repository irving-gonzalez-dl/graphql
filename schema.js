var Student = require('mongoose').model('Student');


var {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

var data = [
    { id: '352332542353252', firstName: 'irving', lastName: 'gonzalez', email: 'i@hotmail.com', age: 27 },
    { id: '352333434334252', firstName: 'john', lastName: 'smith', email: 'smith@hotmail.com', age: 30 }
];

//Student Type
var StudentType = new GraphQLObjectType({
    name: 'Student',
    fields: () => ({
        id: {type: GraphQLString },
        firstName: { type:GraphQLString },
        lastName: { type:GraphQLString },
        email: {type: GraphQLString },
        age: {type: GraphQLInt }
    })
});

//Root Query 
var RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        student:
        {
            type: StudentType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {
             var json = Student.findOne({  "_id": "59e43fcf9675e35e4c10db94" },function(err,data){
                   console.log(err);
        console.log(data);
                    return data;
               })
                return json;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});