var express = require('express');
var News = require('../controllers/news.controller')
var router = express.Router();


router.post('/', News.create); //添加
router.delete('/:id', News.remove); //删除
router.put('/:id', News.updata) //修改
router.post('/list', News.list) //查询+列表
router.get('/:id', News.get) //通过get传输id进行查询
module.exports = router;