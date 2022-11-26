const catDao = require('../dao/CategoryDao')

/**
 * 获取所有分类
 * @param {*} conditions 查询条件
 * @param {*} cb 回调
 */
module.exports.getAllCategorys = (conditions, cb) => {
  catDao.getAllCategorys(1, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 添加分类
 * @param {*} body 添加信息 
 * @param {*} cb 回调
 */
module.exports.addCategory = (body, cb) => {
  catDao.addCategory(body, (err, result) => {
    if (err) return cb('分类名称已存在', null)
    cb(null, result)
  })
}

/**
 * 删除分类
 * @param {*} id id值 
 * @param {*} cb 回调
 */
module.exports.deleteCategory = (id, cb) => {
  catDao.deleteCategory(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 分类总数
 * @param {*} cb 回调
 */
module.exports.countCategory = (cb) => {
  catDao.countCategory((err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 修改分类
 * @param {*} id 修改的id值 
 * @param {*} body 修改的信息
 * @param {*} cb 回调
 */
module.exports.updateCategory = (id, body, cb) => {
  catDao.updateCategory(id, body, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 查询分类信息
 * @param {*} id id 
 * @param {*} cb 回调
 */
module.exports.findCategory = (id, cb) => {
  catDao.findCategory(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}