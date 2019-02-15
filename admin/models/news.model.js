const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({ 
    cateId:mongoose.Schema.ObjectId,
    title: String,
    content: String 
});
schema.plugin(mongoosePaginate);

var News = mongoose.model('News', schema);  // Model.paginate()

module.exports = News;