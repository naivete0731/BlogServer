const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')
const Joi = require('joi')

const UserSchema = new Schema({
  username: {
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
    default: 'user',
    enum: ['superadmin','admin','user']
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


User.findOne({username: 'wuxie'}).then(async result => {
  if (result == null) {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash('123456', salt)

    const user = await User.create({
      username: 'wuxie',
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
    username: Joi.string().min(2).max(10).required().error(new Error('用户名不符合格式')),
    email: Joi.string().regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required().error(new Error('邮箱不符合格式')),
    password: Joi.string().required().regex(/^[A-Za-z0-9]{6,30}$/).error(new Error('密码不符合格式')),
    status: Joi.number().valid(0,1).error(new Error('状态不存在')),
    role: Joi.string().valid('user','admin','superadmin').error(new Error('角色不存在'))
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
    username: Joi.string().regex(/^[a-zA-Z0-9]{2,10}$/).required().error(new Error('账号或密码错误')),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,60}$/).required().error(new Error('账号或密码错误'))
  }
  return Joi.validate(user, schema, {
    // 检测到错误立即返回
    abortEarly: true
})
}
// 校验 id 是否标准
const validateFindById = user => {
  const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id非法'))
        // 验证
  return Joi.validate(user, schema, {
            // 允许对象包含被忽略的未知键
            allowUnknown: true
  });
 
}

// 批量删除
const BatchDelete = userID => {
  if (userID.indexOf('-') != -1) {
    // 批量删除
             // 将字符串id分割为数组
             const ids = userID.split('-');
             // 存储结果数组
             const result = [];
             // 验证
             for (const item of ids) {
                 // 验证
                 let { error } = validateFindById(item);
                 // 数据格式没有通过验证
                 if (error) return error
             }
 } else {
   const { error } = validateFindById(userID)
   if (error) return error
 }
}

// 修改密码
const validateResetPwd = user => {
  const schema = {
    userPass: Joi.string().required().regex(/^[A-Za-z0-9]{6,30}$/).error(new Error('原密码不符合格式,范围在6-30之间')),
    newPass: Joi.string().required().regex(/^[A-Za-z0-9]{6,30}$/).error(new Error('新密码密码不符合格式,范围在6-30之间')),
    confirmPass: Joi.string().required().regex(/^[A-Za-z0-9]{6,30}$/).error(new Error('确认密码不符合格式,范围在6-30之间'))
  }
  // 验证
  return Joi.validate(user, schema, {
    // 检测所有错误
    abortEarly: false,
    // 允许对象包括被忽略的未知键
    allowUnknown: true
  })
}
module.exports = {
  User,
  validateUser,
  validateLogin,
  validateFindById,
  BatchDelete,
  validateResetPwd
}