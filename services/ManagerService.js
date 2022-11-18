const mangeDao = require('../dao/MangerDao')

/**
 * 获取管理员列表
 * @param {*} id id
 * @param {*} cb 回调
 */
module.exports.getManger = (id, cb) => {
  mangeDao.list(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
  
}

/**
 * 查询管理员信息
 * @param {*} id 
 * @param {*} cb 
 */
module.exports.findManager = (id, cb) => {
  mangeDao.find(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}


/**
 * 创建管理员
 * @param {*} params 对象 
 * @param {*} cb 回调
 */
module.exports.createManager = (params, cb) => {
  mangeDao.exists(params.username, params.email, (err, isExists, isEmail) => {
    // 捕获验证异常
    if (err) return cb(err, null)
    // 捕获账号和邮箱异常处理
    if (isExists) return cb(isExists)
    if (isEmail) return cb(isEmail)
    
    mangeDao.create(params, (err, manager) => {
      if (err) return cb(err, null)
      cb(null, manager)
    })
    
  })
}

/**
 * 删除管理员
 * @param {*} usersID 管理员id 
 * @param {*} cb 回调
 */
module.exports.delete = (usersID, cb) => {
  mangeDao.BatchDelete(usersID, (err, result) => {
    if (err) return cb(err, null)
    if (result) {
       cb(null, result)
    }
  })
}