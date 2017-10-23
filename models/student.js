var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    firstName : { type : String, required : [true ,"name is required"]  } ,
    lastName : { type : String, required : [true ,"last name is required"]  } ,
    age : {type: Number },
     email : { type : String, validate : { 
                validator : function(v) {
                        var reg = new RegExp('.+\@.+\..+');
                         return   reg.test(v);
                }, message: "not a valid email" ,

                required : [true , "email is required"]
           } } 
},{ strict: false });


StudentSchema.path('email').validate(function(value, done) {
          var Student = mongoose.model('Student');
          Student.findOne({'email':value},function(err,data){
              if (err) return next(err);
              else if (data) {  return done(false);   }
              else return done(true);
          });
}, 'Email already exists');



 mongoose.model('Student', StudentSchema);


  var Student = mongoose.model('Student');

    var user = new Student({
        firstName:'john',
        lastName:'smith',
        age : 30,
        email:'f@hotmail.com'
    });

    user.save((err)=>{
          if(err)
            console.log('user not saved');
          else
            console.log('user saved');
    });