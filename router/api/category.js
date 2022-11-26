const category = require('express').Router()
const { Category, validateCategory, validateFindById } = require('../../model/category')
// 分类管理模块
const catServ = require('../../services/CategoryService')
// 查询所有分类
category.get('/', (req, res) => {
  catServ.getAllCategorys(1, (err, result) => {
    if (err) return res.sendResult(null, 400, err.message)
    res.sendResult(result, 200, '分类获取成功')
  })
})

// 添加分类
category.post('/', 
  (req, res, next) => {
    const { error } = validateCategory(req.body)
    if (error) return res.send(null, 400, error.message)
    next()
  },
  (req, res, next) => {
    catServ.addCategory(req.body, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 201, '添加分类成功')
    })
  }
)

// 根据分类id删除分类信息
category.delete('/:id', 
  (req, res, next) => {
    if (req.params.id.indexOf('-') != -1) {
      // 批量删除
               // 将字符串id分割为数组
               const ids = req.params.id.split('-');
               // 存储结果数组
               const result = [];
               // 验证
               for (const item of ids) {
                   // 验证
                   let { error } = validateFindById(item);
                   // 数据格式没有通过验证
                   if (error) return res.sendResult(null, 400, error.message)
                   result.push(item)
               }
   } else {
     const { error } = validateFindById(req.params.id)
     if (error) return res.sendResult(null, 400, error.message)
   }
    next()
  },
  (req, res, next) => {
    catServ.deleteCategory(req.params.id, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '删除分类成功')
    })
  }
)

// 查询分类数量
category.get('/count', (req, res) => {
  catServ.countCategory((err, result) => {
    if (err) return res.sendResult(null, 400, err)
    res.sendResult(result, 200, '获取分类数量成功')
  })
})

// 根据分类id修改分类信息
category.put('/:id',
  (req, res, next) => {
    const { error } = validateFindById(req.params.id)
    if (error) return res.sendResult(null, 400, error.message)
    const { error:err } = validateCategory(req.body)
    if (err) return res.sendResult(null, 400, err.message)
    next()
  },
  (req, res, next) => {
    catServ.updateCategory(req.params.id, req.body, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '分类修改成功')
    })
  }
)

// 根据分类id查询分类信息
category.get('/:id',
(req, res, next) => {
  const { error } = validateFindById(req.params.id)
  if (error) return res.sendResult(null, 400, error.message)
  next()
},
(req, res, next) => {
  catServ.findCategory(req.params.id, (err, result) => {
    if (err) return res.sendResult(null, 400, err)
    res.sendResult(result, 200, '获取成功')
  })
}
)

module.exports = category 