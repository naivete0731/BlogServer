const menus = require('express').Router()
const menuServ = require('../../services/MenuService')
const {  validateMenus, validateFindById } = require('../../model/menus')
const { verifyToken } = require('../../modules/passport')

// 获取侧边栏
menus.get('/', (req, res) => {
  menuServ.getMenus((err, result) => {
    if (err) return res.sendResult(null, 400, err.message)
    res.sendResult(result, 200, '侧边栏获取成功')
  })
})

// 添加侧边栏
menus.post('/', 
  (req, res, next) => {
    const { error } = validateMenus(req.body)
    if (error) return res.sendResult(null, 400, error.message)
    next()
  },
  (req, res, next) => {
    menuServ.addMenu(req.body, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 201, '添加侧边栏成功')
    })
  }
)

// 删除侧边栏
menus.delete('/:id', 
  (req, res, next) => {
    const { error } = validateFindById(req.params.id)
    if (error) return res.sendResult(null, 400, error.message)
    next()
  },
  (req, res, next) => {
    menuServ.DeleteComment(req.params.id, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '删除侧边栏成功')
    })
  }
)

menus.get('/:id', 
  (req, res, next) => {
    const { error } = validateFindById(req.params.id)
    if (error) return res.sendResult(null, 400, error.message)
    next()
  },
  (req, res, next) => {
    menuServ.findMenu(req.params.id, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '查询侧边栏成功')
    })
  }
)

menus.put('/:id', 
  (req, res, next) => {
    const { error } = validateFindById(req.params.id)
    if (error) return res.sendResult(null, 400, error.message)
    const { error: err } = validateMenus(req.body)
    if (err) return res.sendResult(null, 400, err.message)
    next()
  },
  (req, res, next) => {
    menuServ.updateMenu(req.params.id, req.body, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '更新侧边栏成功')
    })
  }
)

module.exports = menus