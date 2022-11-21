const api = require('express').Router()

api.use('/users', require('./user'))
api.post('/login', require('./actions/other/login'))
api.post('/upload', require('./actions/other/upload'))










module.exports = api