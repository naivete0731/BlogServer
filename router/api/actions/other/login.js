const jwt = require('jsonwebtoken')
const { User, validateLogin } = require('../../../../model/user')
const bcrypt = require('bcrypt');
// lodash工具
const _ = require('lodash');
const config = require('config')
module.exports = async (req,res) => {
  console.log(req.body)
  try {
    const { error } = validateLogin(req.body); 
    if (error) return res.status(400).sendResult(null, 400, error.message)
    let user = await User.findOne({nickName: req.body.nickName})
    
    if (!user) return res.status(400).sendResult(null,400,'账号或密码错误')
    let validPwd = await bcrypt.compare(req.body.password, user.password)
    if (!validPwd) return res.status(400).sendResult(null,400,'账号或密码错误')
    user = _.pick(user, ['nickName','email','role','avatar','_id','status','createTime'])
    // console.log(user);
    const userinfo = req.body
  //   if (userinfo.nickName !== 'admin' || userinfo.password !== '000000') {
  //     return res.send({
  //         status: 400,
  //         message: '登陆失败！'
  //     })
  // }
  // 登陆成功
    // 在登陆成功之后,调用 jwt.sign() 方法生成JWT字符串,并通过 Token 属性发送给客户端
            //   用户的信息对象              加密的密钥     token有效期
      const tokenStr = jwt.sign({"uid": user.id}, config.get('secretKey'), { expiresIn: config.get('expiresIn')})
      // res.sendResult({"nickName": "wuxie"}, 200, '登陆成功')
      res.send({
        status: 200,
        message: '登陆成功',
        token: 'Bearer ' + tokenStr, // 要发送给客户端的 token 字符串
        data: user
    })
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: '出现了未知错误'
    })
  }
  
}