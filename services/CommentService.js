const CommentDao = require('../dao/CommentDao')

module.exports.getAllComment = (query, cb) => {
  CommentDao.getAllComment(query, (err, result) => {
    console.log(err);
    if (err) return cb(err, null)
    cb(null, result)
  })
}