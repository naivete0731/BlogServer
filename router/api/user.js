const user = require('express').Router()
const config = require('config')
const jwt = require('jsonwebtoken')
const passport = require('../../modules/passport')
const { validateUser, validateFindById } = require('../../model/user')
// 用户管理模块
const mgrServ = require('../../services/ManagerService')

user.get('/', (req,res) => {
  mgrServ.getManger(123, function(err, result) {
    if (err) return res.sendResult(null, 400, err.message)
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
    // console.log(error.message);
    if (error) return res.sendResult(null, 400, error.message)  
    next()
  },
  (req, res, next) => {
    console.log(req.body);
    mgrServ.createManager(req.body, (err, manger) => {
      console.log(err);
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(manger, 201, '管理员创建成功')
    })
    // (req, res, next) 
  }
) 

user.delete('/:id',
  (req, res, next) => {
    console.log(req.params.id);
    
    // console.log(error);
    if (req.params.id.indexOf('-') != -1) {
       // 批量删除
                // 将字符串id分割为数组
                const ids = req.params.id.split('-');
                // 存储结果数组
                const result = [];
                // 验证
                for (const item of ids) {
                    // 验证
                    let { error } = validateFindById(item);
                    // 数据格式没有通过验证
                    if (error) return res.sendResult(null, 400, error.message)
                    result.push(item)
                }
    } else {
      const { error } = validateFindById(req.params.id)
      if (error) return res.sendResult(null, 400, error.message)
    }
    next()
  },
  (req, res, next) => {
    // console.log(ids);  
    mgrServ.delete(req.params.id, (err, manger) => {

      if (err) return res.sendResult(null, 400, err)
      res.sendResult(manger, 201, '账号删除成功')
    })
  }
)

module.exports = user 