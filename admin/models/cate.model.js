var mongoose = require('mongoose'),
  materializedPlugin = require('mongoose-materialized');

var schema = new mongoose.Schema({
  text: { type: String },
  type: { type: String }   // 新闻就是 1 产品 2....
});

schema.plugin(materializedPlugin);

var Cate = mongoose.model('cates', schema);  // Category

module.exports = Cate;