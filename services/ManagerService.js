const mangeDao = require('../dao/MangerDao')

/**
 * 获取管理员列表
 * @param {*} id 
 * @param {*} cb 回调
 */
module.exports.getManger = (id, cb) => {
  mangeDao.list(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
  
}

module.exports.createManager = (params, cb) => {
  mangeDao.exists(params.username, (err, isExists) => {
    if (err) return cb(err, null)
    if (isExists) {
      return cb('账号已存在')
    }

    mangeDao.create(params, (err, manager) => {
      if (err) return cb(err, null)

      cb(null, manager)
    })
    
  })
}