const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({ 
    name:String,
    password:String,
    sex:Boolean,
    age:Number,
    tel:String,
    birthday:Date,
    address:String,
    marray:Boolean,
    salary:String,
    time:Date
 });
schema.plugin(mongoosePaginate);

var User = mongoose.model('users',  schema) // Model.paginate()
 
module.exports=User; 