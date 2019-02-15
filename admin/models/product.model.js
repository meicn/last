const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({ 
    cateId:mongoose.Schema.ObjectId,
    title: String,
    content: String 
});
schema.plugin(mongoosePaginate);

var Product = mongoose.model('Product', schema);  // Model.paginate()

module.exports = Product;