const SlideDao = require('../dao/slideDao')

module.exports.AddSlide = (body, cb) => {
  SlideDao.AddSlide(body, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

module.exports.DeleteSlide = (id, cb) => {
  SlideDao.DeleteSlide(id, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

module.exports.getAllSlide = (cb) => {
  SlideDao.getAllSlide((err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}