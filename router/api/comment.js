const comment = require('express').Router()
const commentServ = require('../../services/CommentService')
comment.get('/', 
  (req, res, next) => {
    console.log(req.query);
    commentServ.getAllComment(req.query, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '获取所有评论成功')
    })
  
})





module.exports = comment