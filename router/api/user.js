const user = require('express').Router()
const config = require('config')
const jwt = require('jsonwebtoken')
const passport = require('../../modules/passport')
const { validateUser } = require('../../model/user')
// 用户管理模块
const mgrServ = require('../../services/ManagerService')

user.get('/', (req,res) => {
  mgrServ.getManger(123, function(err, result) {
    if (err) return res.sendResult(null, 400, err)
    console.log(result);
    res.sendResult(result,200,'获取管理员列表成功')
  })
})

user.get('/userinfo', (req,res) => {
  const token = req.headers.authorization
    const myVerifyToken = passport.verifyToken(token)
    res.sendResult(myVerifyToken, 200, '获取用户信息成功')
})

user.post('/',
  // 校验参数
  (req, res, next) => {
    const { error } = validateUser(req.body)
    // console.log(error);
    if (error) return res.sendResult(null, 400, error)
    next()
  },
  (req, res, next) => {
    console.log(req.body);
    mgrServ.createManager(req.body, (err, manger) => {
      console.log(err);
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(manger, 200, '创建成功')
    })
    
    // (req, res, next) 
  }
) 

module.exports = user 