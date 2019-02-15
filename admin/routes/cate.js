var express = require('express');
var Cate = require('../controllers/cate.controller')
var router = express.Router();

/* GET users listing. */
router.post('/', Cate.create); //添加
router.delete('/:id', Cate.remove); //删除
router.put('/:id', Cate.updata) //修改
router.get('/:id', Cate.get) //通过get传输id进行查询
    //list可以有两个路由
router.post('/list', Cate.list) //查询+列表
router.post('/list/:type', Cate.list)
router.post('/listype', Cate.listype) //查询共有集中数据类型

module.exports = router;