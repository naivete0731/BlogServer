const menuDao = require('../dao/MenusDao')

/**
 * 获取所有分类
 * @param {*} conditions 查询条件
 * @param {*} cb 回调
 */
module.exports.getMenus = (cb) => {
  menuDao.getMenus((err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

module.exports.addMenu = (body, cb) => {
  menuDao.addMenu(body, (err, result) => {
    console.log(err);
    if (err) return cb(err, null)
    cb(null, result)
  })
}


module.exports.DeleteComment = (id, cb) => {
  menuDao.DeleteComment(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

module.exports.findMenu = (id, cb) => {
  menuDao.findMenu(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

module.exports.updateMenu = (id, body, cb) => {
  menuDao.updateMenu(id, body, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}