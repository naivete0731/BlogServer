const api = require('express').Router()

// 用户管理模块
api.use('/users', require('./user'))
// 分类模块
api.use('/category', require('./category'))
// 文章模块
api.use('/posts', require('./posts'))
// 登陆模块
api.post('/login', require('./actions/other/login'))
// 图片上传
api.post('/upload',require('./actions/other/upload'))









module.exports = api
