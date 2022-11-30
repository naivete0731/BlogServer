const TagDao = require('../dao/TagDao')

/**
 * 获取所有便签
 * @param {*} cb 回调
 */
module.exports.getAllTag = (cb) => {
  TagDao.getAllTag((err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 添加标签
 * @param {*} name 标签名
 * @param {*} cb 回调
 */
module.exports.addTag = (name, cb) => {
  TagDao.addTag(name, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 删除标签
 * @param {*} id 标签id 
 * @param {*} cb 回调
 */
module.exports.deleteTag = (id, cb) => {
  TagDao.delTag(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 添加标签链接
 * @param {*} pid 文章id
 * @param {*} tid 标签id
 * @param {*} cb 回调
 */
module.exports.addRelation = (pid, tid, cb) => {
  TagDao.addRelation(pid, tid, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 删除标签链接
 * @param {*} id 标签链接id
 * @param {*} cb 回调
 */
module.exports.deleteRelation = (id, cb) => {
  TagDao.deleteRelation(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 获取所有标签链接
 * @param {*} cb 回调
 */
module.exports.getAllRelation = (cb) => {
  TagDao.getAllRelation((err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 根据id获取标签链接
 * @param {*} id 标签链接id
 * @param {*} cb 回调
 */
module.exports.getPostRelation = (id, cb) => {
  TagDao.getPostRelation(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}
