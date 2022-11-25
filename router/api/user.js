const user = require('express').Router()
const config = require('config')
const jwt = require('jsonwebtoken')
const passport = require('../../modules/passport')
const { validateUser, validateFindById, validateResetPwd, validateUserInfo } = require('../../model/user')
// 用户管理模块
const mgrServ = require('../../services/ManagerService')

// 查询用户列表
user.get('/', (req,res) => {
  mgrServ.getManger(123, function(err, result) {
    if (err) return res.sendResult(null, 400, err.message)
    console.log(result);
    res.sendResult(result,200,'获取管理员列表成功')
  })
})

// 获取用户信息
user.get('/:id', 
  (req, res, next) => {
    const { error } = validateFindById(req.params.id)
    if (error) return res.sendResult(null, 400, error.message)
    next()
  },
  (req, res, next) => {
    mgrServ.findManager(req.params.id, (err, manger) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(manger, 200, '获取管理员信息成功')
    })
  }
)

// 修改用户密码
user.put('/password', 
// 校验参数
(req, res, next) => {
  const { error } = validateFindById(passport.verifyToken(req.headers.authorization).data._id)
  // console.log(passport.verifyToken(req.headers.authorization));
  const { error: err} = validateResetPwd(req.body)
    if (err) return res.sendResult(null, 400, err.message)
    if (error) return res.sendResult(null, 400, error.message)
  next()
},
(req, res, next) => {
  const token = passport.verifyToken(req.headers.authorization).data._id
  mgrServ.password(token, req.body, (err, manger) => {
    if (err) return res.sendResult(null, 400, err)
    res.sendResult('', 200, '密码修改成功')

  })
}
)

// 修改用户信息
user.put('/:id',
  //校验参数
  (req, res, next) => {
    const { error } = validateFindById(req.params.id)
    const { error:err } = validateUserInfo(req.body)
    if (err) return res.sendResult(null, 400, err.message)  
    if (error) return res.sendResult(null, 400, error.message)  
    next()
  },
  (req, res, next) => {
    mgrServ.updateManager(req.params.id, req.body, (err, manger) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(manger, 201, '账号更新成功')
  })
}
)



  
// 创建用户信息
user.post('/',
  // 校验参数
  (req, res, next) => {
    const { error } = validateUser(req.body)
    if (error) return res.sendResult(null, 400, error.message)  
    next()
  },
  (req, res, next) => {
    // console.log(req.body);
    mgrServ.createManager(req.body, (err, manger) => {
      // console.log(err);
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(manger, 201, '管理员创建成功')
    })
    // (req, res, next) 
  }
) 

// 删除用户信息
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
      console.log(err);
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(manger, 201, '账号删除成功')
    })
  }
)

module.exports = user 