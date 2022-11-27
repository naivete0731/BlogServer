const TagDao = require('../dao/TagDao')

module.exports.getAllTag = (cb) => {
  TagDao.getAllTag((err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

module.exports.addTag = (name, cb) => {
  TagDao.addTag(name, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

module.exports.deleteTag = (id, cb) => {
  TagDao.delTag(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

module.exports.addRelation = (pid, tid, cb) => {
  TagDao.addRelation(pid, tid, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

module.exports.deleteRelation = (id, cb) => {
  TagDao.deleteRelation(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

module.exports.getAllRelation = (cb) => {
  TagDao.getAllRelation((err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

module.exports.getPostRelation = (id, cb) => {
  TagDao.getPostRelation(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}
