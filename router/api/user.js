const user = require('express').Router()

user.get('/', (req,res) => {
  console.log(req.user);
    res.send({
        status: 200,
        message: '获取用户信息成功',
        data: req.user // 要发送给客户端的信息
    })
})

module.exports = user