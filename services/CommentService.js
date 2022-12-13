const CommentDao = require('../dao/CommentDao')

module.exports.getAllComment = (query, cb) => {
  CommentDao.getAllComment(query, (err, result) => {
    console.log(err);
    if (err) return cb(err, null)
    cb(null, result)
  })
}


module.exports.getPostComment = (id, cb) => {
  CommentDao.getPostComment(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

module.exports.AddComment = (id, body, cb) => {
  CommentDao.AddComment(id, body, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

module.exports.DeleteComment = (id, cb) => {
  CommentDao.DeleteComment(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

module.exports.BatchUpdateCommentStatus = (id, cb) => {
  CommentDao.BatchUpdateCommentStatus(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

module.exports.GetLatestComments = (num, cb) => {
  CommentDao.GetLatestComments(num, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

module.exports.getAllCommentsCount = (cb) => {
  CommentDao.getAllCommentsCount((err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

module.exports.getIdCommentsCount = (id, cb) => {
  CommentDao.getIdCommentsCount(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}