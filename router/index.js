module.exports = app => {
  // 不需要权限
  app.use('/api', require('./api'))
  // 需要权限
  // app.use('/api/v1', require('./api'))
}
