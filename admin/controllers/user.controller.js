const mongoose = require('mongoose');
const User = require('../models/user.model');

exports.create = function(req, res, next) { //添加
    var user = new User(req.body)
    user.save().then(data => {
        res.json(data)
    })
};
exports.remove = function(req, res, next) { //删除
    var id = req.params.id.split(',');
    //将接受到的id字符串转换成数组
    User.remove({ _id: { $in: id } }, (err, data) => {
        //删除数组id里面包含的_id
        res.json(data)
    })
};
exports.updata = function(req, res, next) { //修改
    var id = req.params.id;
    User.findByIdAndUpdate(id, { $set: req.body }).then(data => {
        res.json(data)
    })
};

exports.list = function(req, res, next) { //列表
    var page = req.body.page ? req.body.page : 1;
    var rows = req.body.rows ? req.body.rows : 5;
    //因为跟前端有冲突所以将limit改成rows
    var querystr = {};
    if (req.body.name && req.body.name.trim().length > 0) {
        // trim()是去两边的空格
        name = req.body.name;
        querystr = {
            'name': new RegExp(name, 'i')
        }
    };
    User.paginate(querystr, { page: +page, limit: +rows }, function(err, result) {
        //page和limit之前加+号是将它们转换成number类型
        result.rows = result.docs;
        delete result.docs;
        res.json(result)
    });
};
exports.get = function(req, res, next) {
    var id = req.params.id;
    User.findById(id).then(data => {
        res.json(data)
    })
};