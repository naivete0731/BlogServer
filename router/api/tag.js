const tag = require('express').Router()
const tagServ = require('../../services/TagService')
const { validateTag, validateFindById } = require('../../model/tag')

// 获取所有标签
tag.get('/',
  (req, res, next) => {
    tagServ.getAllTag((err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '获取所有标签成功')
    })
  }
)

// 添加标签
tag.post('/',
  (req, res, next) => {
    const { error } = validateTag(req.body)
    if (error) return res.sendResult(error.message)
    next()
  },
  (req, res, next) => {
    tagServ.addTag(req.body.name, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result,200,'添加标签成功')
  }
)
})

// 删除标签
tag.delete('/:id ', 
  (req, res, next) => {
    const { error } = validateFindById(req.params.id)
    if (error) return res.sendResult(null, 400, error.message)
    next()
  },
  (req, res, next) => {
    tagServ.deleteTag(req.params.id, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '删除便签成功')
    })
  }
)

// 添加标签链接
tag.post('/relation',
  (req, res, next) => {
    const { error } = validateFindById(req.body.pid)
    if (error) return res.sendResult(null, 400, error.message)
    const { error:err } = validateFindById(req.body.tid)
    if (err) return res.sendResult(null, 400, err.message)
    next()
  },
  (req, res, next) => {
    tagServ.addRelation(req.body.pid, req.body.tid, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '添加链接成功')
    })
  }
)

// 删除标签链接
tag.delete('/relation/:id',
(req, res, next) => {
  const { error } = validateFindById(req.params.id)
  if (error) return res.sendResult(null, 400, error.message)
  next()
},
(req, res, next) => {
  tagServ.deleteRelation(req.params.id, (err, result) => {
    if (err) return res.sendResult(null, 400, err)
    res.sendResult(result, 200, '删除便签成功')
  })
}
)

// 获取所有标签链接
tag.get('/relation/',
  (req, res, next) => {
    tagServ.getAllRelation((err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '获取所有标签成功')
    })
  }
)

// 根据id查看标签链接
tag.get('/relation/post/:id',
(req, res, next) => {
  const { error } = validateFindById(req.params.id)
  if (error) return res.sendResult(null, 400, error.message)
  next()
},
(req, res, next) => {
  tagServ.getPostRelation(req.params.id, (err, result) => {
    if (err) return res.sendResult(null, 400, err)
    res.sendResult(result, 200, '成功获取文章下的标签')
  })
}
)

module.exports = tag