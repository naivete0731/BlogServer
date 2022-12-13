const api = require('express').Router()
// 限制请求
const { apiLimiter } = require('../../modules/apiRate_limit')
// 用户管理模块
api.use('/users', require('./user'))
// 分类模块
api.use('/category', require('./category'))
// 文章模块
api.use('/posts', require('./posts'))
// 标签模块
api.use('/tag', require('./tag'))
// 评论模块
api.use('/comment', require('./comment'))
// 轮播图模块
api.use('/slide', require('./slide'))
// 登陆模块
api.post('/login', apiLimiter, require('./actions/other/login'))
// 图片上传
api.post('/upload',require('./actions/other/upload'))









module.exports = api
