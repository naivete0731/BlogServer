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

// 获取文章内的评论   正则：只匹配数字
comment.get('/:id', 
  (req, res, next) => {
    console.log(req.params);
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

// 批量删除评论
comment.delete('/:id', 
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
    commentServ.DeleteComment(req.params.id, (err, result) => {
      console.log(err);
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '删除分类成功')
    })
  }
)


comment.put('/:id', 
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
    commentServ.BatchUpdateCommentStatus(req.params.id, (err, result) => {
            if (err) return res.sendResult(null, 400, err)
            res.sendResult(result, 200, '更改评论状态成功')
          })
  }
)

// comment.get('/lasted',
//   (req, res, next) => {
//     console.log(req);
//     const num = 5
//     commentServ.GetLatestComments(num, (err, result) => {
//       if (err) return res.sendResult(null, 400, err)
//       res.sendResult(result, 200, '获取最新评论成功')
//     })
//   }
// )

// comment.get('/getAllCommentsCount', 
//   (req, res, next) => {
//     commentServ.getAllCommentsCount((err, result) => {
//       if (err) return res.sendResult(null, 400, err)
//       res.sendResult(result, 200, '获取所有评论数量成功')
//     })
//   }
// )

// comment.get('/getIdCommentsCount', 
//   (req, res, next) => {
//     console.log(req.params);
//     const { error } = validateFindById(req.params.id)
//     if (error) return res.sendResult(null, 400, error.message)
//     next()
// },
//   (req, res, next) => {
//     commentServ.getIdCommentsCount(req.params.id, (err, result) => {
//       if (err) return res.sendResult(null, 400, err)
//       res.sendResult(result, 200, '获取文章评论数量成功')
//     })
//   }
// )


module.exports = comment