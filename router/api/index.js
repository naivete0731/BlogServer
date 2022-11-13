const api = require('express').Router()

api.use('/users', require('./user'))
api.post('/login', require('./actions/other/login'))










module.exports = api