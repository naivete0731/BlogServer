const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')
const Joi = require('joi')

const UserSchema = new Schema({
  nickName: {
    type: String,
    required: true,
    minlength: 2,
    maxlenght: 10
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlenght: 100
  },
  role: {
    type: String,
    default: 'normal',
    enum: ['superadmin','admin','normal']
  },
  avatar: {
    type: String,
    default: null
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Number,
    required: true,
    default: 1
  }
})

const User = mongoose.model('User', UserSchema)


User.findOne({nickname: 'wuxie'}).then(async result => {
  if (result == null) {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash('123456', salt)

    const user = await User.create({
      nickName: 'wuxie',
      email: '1150453675@qq.com',
      password: password,
      role: 'superadmin',
      avatar: null,
      createTime: new Date,
      status: 1
    })
    console.log('创建成功');
  }
})

// 注册格式校验
const validateUser = user => {
  const schema = {
    nickName: Joi.string().min(2).max(10).required().error(new Error('用户名不符合格式')),
    email: Joi.string().regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required().error(new Error('邮箱不符合格式')),
    password: Joi.string().required().regex(/^[A-Za-z0-9]{6,30}$/).error(new Error('密码不符合格式')),
    status: Joi.number().valid(0,1),
    role: Joi.string().valid('normal','admin','superadmin')
  }
  // 验证
  return Joi.validate(user, schema, {
    // 检测所有错误
    abortEarly: false,
    // 允许对象包括被忽略的未知键
    allowUnknown: true
  })
}

// 登陆格式校验
const validateLogin = user => {
  const schema = {
    nickName: Joi.string().regex(/^[a-zA-Z0-9]{2,10}$/).required().error(new Error('账号或密码错误')),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,60}$/).required().error(new Error('账号或密码错误'))
  }
  return Joi.validate(user, schema, {
    // 检测到错误立即返回
    abortEarly: true
})
}

module.exports = {
  User,
  validateUser,
  validateLogin
}