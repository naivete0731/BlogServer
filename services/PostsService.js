const postDao = require('../dao/PostsDao')

/**
 * // 添加文章信息
 * @param {*} id 用户id
 * @param {*} body 文章内容
 * @param {*} cb 回调
 */
module.exports.addPost = (id, body, cb) => {
  postDao.addPost(id, body, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 获取所有文章
 * @param {*} query  {pagenum: 当前页，pagesize: 显示的数据条数}
 * @param {*} cb 回调
 */
module.exports.getPosts = (query, cb) => {
  postDao.getPosts(query, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 获取文章总数
 * @param {*} cb 回调
 */
module.exports.countPosts = (cb) => {
  postDao.countPosts((err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 获取最新发布文章
 * @param {*} cb 回调
 */
module.exports.lasted = (cb) => {
  postDao.lasted((err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 获取热门推荐
 * @param {*} cb 回调
 */
module.exports.recommend = (cb) => {
  postDao.recommend((err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 获取随机推荐
 * @param {*} cb 回调
 */
module.exports.random = (cb) => {
  postDao.random((err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 *  文章点赞
 * @param {*} id 文章id
 * @param {*} cb 回调
 */
module.exports.fabulous = (id, cb) => {
  postDao.fabulous(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 文章搜索
 * @param {*} q 搜索内容
 * @param {*} cb 回调
 */
module.exports.search = (q, cb) => {
  postDao.search(q, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 根据分类获取文章列表 
 * @param {*} id 分类id
 * @param {*} cb 回调
 */
module.exports.category = (id, state, cb) => {
  postDao.category(id, state, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 根据文章id获取文章信息
 * @param {*} id 文章id
 * @param {*} cb 回调
 */
module.exports.findPost = (id, cb) => {
  postDao.findPost(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 根据id修改文章
 * @param {*} id 文章id
 * @param {*} body 文章内容
 * @param {*} cb 回调
 */
module.exports.updatePost = (id, body, cb) => {
  postDao.updatePost(id, body, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

/**
 * 根据id删除文章
 * @param {*} id 删除的文章id
 * @param {*} cb 回调
 */
module.exports.deletePosts = (id, cb) => {
  postDao.deletePosts(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}