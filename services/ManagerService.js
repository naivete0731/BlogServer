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
 * 创建管理员
 * @param {*} params 对象 
 * @param {*} cb 回调
 */
module.exports.createManager = (params, cb) => {
  mangeDao.exists(params.username, params.email, (err, isExists, isEmail) => {
    if (err) return cb(err, null)
    if (isExists) {
      return cb('账号已存在')
    } 
    if (isEmail) {
      return cb('邮箱已存在')
    }
    mangeDao.create(params, (err, manager) => {
      if (err) return cb(err, null)
      cb(null, manager)
    })
    
  })
}


module.exports.delete = (usersID, cb) => {
  mangeDao.BatchDelete(usersID, (err, result) => {
    if (err) return cb(err, null)
    console.log(result);
    if (result) {
       cb(null, result)
    }
  })
}