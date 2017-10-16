var mongoose= require('mongoose');

 var db =mongoose.connect('mongodb://admin1:edfipassword@ds135700.mlab.com:35700/edfi');

 db.connection.on('connected',()=>
{
    console.log('connected to mongoDB');
});

module.exports =db;


require('./student');