const user = require('express').Router()
const config = require('config')
const jwt = require('jsonwebtoken')
const passport = require('../../modules/passport')
const mgrServ = require('../../services/ManagerService')

user.get('/', (req,res) => {
  mgrServ.getManger(123, function(err, result) {
    console.log(err)
    console.log(result);
  })
  res.sendResult(null,200,'ok')
})

user.get('/userinfo', (req,res) => {
  const token = req.headers.authorization
    const myVerifyToken = passport.verifyToken(token)
    res.send({
        status: 200,
        message: '获取用户信息成功',
        data: myVerifyToken // 要发送给客户端的信息
    })
  console.log(myVerifyToken);
})


module.exports = user 