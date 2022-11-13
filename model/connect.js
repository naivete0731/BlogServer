const mongoose = require('mongoose')
// 引入config
const config = require('config')

mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`).then(() => console.log('mongodb connect true')).catch(err => console.log(err))

// mongoose.connect('mongodb://wuxie:123456@localhost:27017/Naivete').then(() => console.log('mongodb connect true')).catch(err => console.log(err))
