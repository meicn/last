var express = require('express');
var Product = require('../controllers/product.controller')
var router = express.Router();


router.post('/', Product.create); //添加
router.delete('/:id', Product.remove); //删除
router.put('/:id', Product.updata) //修改
router.post('/list', Product.list) //查询+列表
router.get('/:id', Product.get) //通过get传输id进行查询
module.exports = router;