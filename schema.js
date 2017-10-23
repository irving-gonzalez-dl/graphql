var Student = require('mongoose').model('Student');


var GraphQLJSON = require('graphql-type-json');
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
                keys: { type: GraphQLJSON }
            },
            resolve(parentValue, args) {
  
         //  var ovj =    JSON.parse( args.keys);
        console.log(args.keys);
        //   console.log(ovj);
          // console.log(ovj.name);
 
             var json = Student.findOne(args.keys,function(err,data){
               
               console.log(err);
               console.log(data);
                    return data;
               })
                return json;
            }
        },

        students: {
            type: GraphQLJSON,
            resolve(parentValue,args){

                 var json = Student.find({},function(err,data){
               
               console.log(err);
               console.log(data);
                    return data;
               });
                return json;


            }
        }
    }
});


//mutations
var MutationType = new GraphQLObjectType({
  name: 'Mutations',
  description: 'These are the things we can change',
  fields: () => ({
      addStudent: {
      type: GraphQLString,
      description: 'add a Student with id and return the student that was added',
      args: {
        keys: { type: GraphQLJSON }
      },
      resolve: (parentValue, args) => {
   
           var _mongooseStudent = new Student(args.keys);
       var response =   _mongooseStudent.save(function(err){
                    if(err){
                        return err;
                    }
                    else return args.keys;
            });
               return response;

      }
    }
  })
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: MutationType
});