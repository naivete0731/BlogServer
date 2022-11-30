const comment = require('express').Router()

comment.get('/', (req, res, next) => {
  res.send('ok')
})





module.exports = comment