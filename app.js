const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const config = require('config')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser');
const multer = require('multer'); //解析Post文件
const objMulter = multer({ 
  dest: './public/uploads/'
})



// 路由
const mount = require('mount-routes')
const jwt = require('jsonwebtoken')
const passport = require('./modules/passport')
// const { expressjwt } = require("express-jwt")
// const expressJWT = require('express-jwt');
const app = express()
// 跨域
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(objMulter.any());
// 初始化统一响应机制
const resextra = require('./modules/resextra')
app.use(resextra)
app.use(morgan('dev'))
// ip黑名单
// const ipfilter = require('express-ipfilter').IpFilter;

// // Set up an array of IP addresses to be blocked
// const blacklist = ['10.0.0.0/8', '192.168.0.0/16'];

// // Use the ipFilter middleware to block access for the specified IP addresses
// app.use(ipfilter(blacklist, { mode: 'deny' }));

// Set up your app's routes and other logic as usual


//  注册将 JWT 字符串解析还原成 JSON 对象的中间件
// 注意：只要配置成功了 express-jwt 这个中间件,就可以把解析出来的用户信息,挂载到 req.user 属性上
// app.use(expressjwt({ 
//   secret: config.get('secretKey'), 
//   algorithms: ["HS256"] 
// }).unless({
//   path: [
//     // { url: '/^\/api\//', methods: ['POST'] }
//     { url: '/api/login', methods: ['POST'] }
//   ]
// }))
// app.use(expressJWT({secret: config.get('secretKey')}).unless({path: ['/api/login']}))
// 开发环境使用s

// if (process.env.NODE_ENV == 'development') {
//   // 开发环境                                                                                                                                                                                                               
//   console.log('is the development');
//   // 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
//   app.use(morgan('dev'))
// } else {
//   // 生产环境
//   console.log('is the production');
//   app.use(morgan('dev'))
// }

require('./model/connect')
// require('./model/comment')
app.use((req,res,next) => {
  const pass = ['/api/login', '/api/category/', '/api/posts/count', '/api/posts/:id', '/api/posts/lasted', '/api/posts/recommend', '/api/posts/random', '/api/posts/fabulous/:id', '/api/posts/search/:q', '/api/posts/category/:id', '/api/tag/', '/api/tag/relation/', '/api/tag/relation/post/:id','/api/uploads/*']
  if (req.path !== '/api/login') {
        const verifyData = passport.verifyToken(req.headers.authorization)
        if (verifyData === 'UnauthorizedError') {
          res.status(401).sendResult(null, 401, '无效token')
        } else {
          next()
        }
  } else {
    next()
  }
})
// 路由挂载
mount(app,'router')

// app.use((req,res,next) => {
//   const verifyData = passport.verifyToken(req.headers.authorization)
// console.log(req.headers.authorization);
//   if (req._parsedUrl.pathname !== 'login') {
//      if (verifyData.result) {
//     next()
//   } else {
//     res.send({
//       status: 400,
//       message: 'token失效'
//     })
//   }
//   } else {
//     next()
//   }
 
// })
// const mytoken = passport.getToken({'username': 'wuxie'})
// console.log(mytoken);
// const myVerifyToken = passport.verifyToken(mytoken)
// console.log(myVerifyToken);
// app.use((err,req,res,next) => {
//   // token 解析失败导致的错误
// 	console.log(err.name)
//   if(err.name === 'UnauthorizedError') {
//       return res.sendResult(null, 401, '无效的token')
//   }
//   // 其他原因导致的错误
//   res.sendResult(null, 500, '未知错误')
  
// })
// passport.getToken()

app.use((err,req,res,next) => {
  console.log(err);
  res.status(404).sendResult(null, 404, '404 Not Fund')
})


app.listen(3000, () => console.log('localhost:3000'))