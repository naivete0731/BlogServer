const comment = require('express').Router()
const commentServ = require('../../services/CommentService')
const { validateFindById, validateComment } = require('../../model/comment')
const { verifyToken } = require('../../modules/passport')
// 获取所有评论
comment.get('/', 
  (req, res, next) => {
    console.log(req.query);
    commentServ.getAllComment(req.query, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '获取所有评论成功')
    })
  
})

// 获取文章内的评论
comment.get('/:id', 
  (req, res, next) => {
    const { error } = validateFindById(req.params.id)
    if (error) return res.sendResult(null, 400, error.message)
    next()
  },
  (req, res, next) => {
    commentServ.getPostComment(req.params.id, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '获取文章评论成功')
    })
  }
)

// 添加评论
comment.post('/:id',
  (req, res, next) => {
    const { error } = validateFindById(req.params.id)
    if (error) return res.sendResult(null, 400, error.message)
    const { error:err } = validateComment(req.body)
    if (err) return res.sendResult(null, 400, err.message)
    next()
  },
  (req, res, next) => {
    if (req.headers.authorization) {
      const group = verifyToken(req.headers.authorization).data.role
      if (group !== 'user') {
        req.body.adminComment = true
      }
    }
    commentServ.AddComment(req.params.id, req.body, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 201, '评论成功')
    })
  }
)


module.exports = comment