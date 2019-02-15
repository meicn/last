var express = require('express');
var User = require('../controllers/user.controller')
var router = express.Router();

/* GET users listing. */
router.post('/', User.create); //添加
router.delete('/:id', User.remove); //删除
router.put('/:id', User.updata) //修改
router.post('/list', User.list) //查询+列表
router.get('/:id', User.get) //通过get传输id进行查询
module.exports = router;