const mongoose = require('mongoose');
const Product = require('../models/product.model');


exports.create = function(req, res, next) {
    var product = new Product(req.body);
    product.save().then(data => {
      res.json(data);
    });
  };
  
exports.remove = function(req, res, next) { //删除
    var id = req.params.id.split(',');
    //将接受到的id字符串转换成数组
    Product.remove({ _id: { $in: id } }, (err, data) => {
        //删除数组id里面包含的_id
        res.json(data)
    })
};
exports.updata = function(req, res, next) { //修改
    var id = req.params.id;
    Product.findByIdAndUpdate(id, { $set: req.body }).then(data => {
        res.json(data)
    })
};

exports.list = function(req, res, next) { //列表
    var page = req.body.page ? req.body.page : 1;
    var rows = req.body.rows ? req.body.rows : 5;
    var cateid = req.body.cateid;
    var querystr = {};
    console.log(req.body)
    if (!cateid == undefined) {
        res.json('没有cateid');
        return;
    } else {
        querystr = {
            cateid: cateid
        }
    }
    //因为跟前端有冲突所以将limit改成rows
    if (req.body.name && req.body.name.trim().length > 0) {
        // trim()是去两边的空格
        name = req.body.name;
        querystr = Object.assign(querystr, { //assign:对象的合并
            'name': new RegExp(name, 'i')
        })
    };
    Product.paginate(querystr, { page: +page, limit: +rows }, function(err, result) {
        //page和limit之前加+号是将它们转换成number类型
        result.rows = result.docs;
        delete result.docs;
        res.json(result)
    });
};
exports.get = function(req, res, next) {
    var id = req.params.id;
    Product.findById(id).then(data => {
        res.json(data)
    })
};