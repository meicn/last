const mongoose = require('mongoose');
const Cate = require('../models/cate.model');

exports.create = function(req, res, next) { //添加
    var cate = new Cate(req.body)
    cate.save().then(data => {
        res.json(data)
    })
};
exports.remove = function(req, res, next) { //删除
    var id = req.params.id.split(',');
    var ids = []
    Cate.findOne({ _id: { $in: id } }, function(err, doc) {
        ids = [doc._id]
        doc.getChildren().then(function(docs) {
            for (var i = 0; i < docs.length; i++) {
                ids.push(docs[i]._id)
            }
            Cate.remove({ _id: { $in: ids } }).then(data => {
                res.json('删除成功')
            })
        });
    })
};
exports.updata = function(req, res, next) { //修改
    var id = req.params.id;
    Cate.findByIdAndUpdate(id, { $set: req.body }).then(data => {
        res.json(data)
    })
};

exports.list = function(req, res, next) { //列表
    var type = req.params.type || 2;
    Cate.find({ type: type }, (err, data) => {
        var rptree = reverseTree(data, null)
        res.json(rptree)
    })
};
exports.get = function(req, res, next) {
    var id = req.params.id;
    Cate.findById(id).then(data => {
        res.json(data)
    })
};
//
exports.listype = function(req, res, next) { //列表查询数据里面的type值
    Cate.find({ "parentId": null }, (err, data) => {
        var rptree = reverseTree(data, null)
        res.json(rptree)
    })
};


//无限分类数据结构采用递归
function reverseTree(data, fid) {
    var resulte = [];
    var temp;
    var data = JSON.parse(JSON.stringify(data));
    //先将对象转成字符串，再将字符转专程json-object。。。。。因为mongdb数据模型里面没有childer
    for (var i in data) {
        if (data[i].parentId == fid) {
            resulte.push(data[i])
            temp = reverseTree(data, data[i]._id);
            if (temp.length > 0) {
                data[i].children = temp;
            }
        }
    }
    return resulte
}