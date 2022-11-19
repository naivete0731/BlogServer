const { User } = require('../model/user')
const bcrypt = require('bcrypt');
const _ = require('lodash');
/**
 * 获取所有管理员用户
 * @param {*} conditions 查询条件
 * @param {*} cb 回调
 */
module.exports.list = async (conditions, cb) => {
  try {
    const users = await User.find().select('-password').sort('creaetTime')
    cb(null, users)
  } catch (err) {
    cb(err, null)
  }
}
/**
 * 创建管理员用户
 * @param {*} obj 对象 
 * @param {*} cb 回调
 */
module.exports.create = async (obj, cb) => {
  try {
    const selt = await bcrypt.genSalt(10)
    obj.password = await bcrypt.hash(obj.password, selt)
    // console.log(obj.password);
    let user = new User(obj)
    await user.save()
    user = _.pick(user, ['_id','email','username','role','avatar','createTime','status'])
    cb(null, user)
  } catch (err) {
    cb(err,null)
  }
}

/**
 * 查询管理员信息
 * @param {*} id id
 * @param {*} cb 回调
 * @returns 
 */
module.exports.find = async (id, cb) => {
  try {
    const user = await User.findById(id).select('-password')
    if (user === null) return cb('ID不存在', null)
    cb(null, user)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 根据账号查询是否存在用户
 * @param {*} username 账号
 * @param {*} cb 回调
 */
module.exports.exists = async (username, emails, cb) => {
  try {
    const user = await User.findOne({username}).select('-password')
    const email = await User.findOne({email: emails}).select('-password')
     if (user !== null) {
      return cb(null,null, '账号已存在')
    } 
    if (email !== null) {
      return cb(null,null, '邮箱已存在')
    } 
    cb()
  } catch (err) {
    cb(err, null, null)
  }
} 

/**
 * 修改管理员信息
 * @param {*} id 修改的用户id
 * @param {*} body 修改的信息
 * @param {*} cb 回调
 * @returns 
 */
module.exports.update = async (id, body, cb) => {
  try {
    const email = await User.findOne({email: body.email}).select('-password')
    if (email !== null) {
      return cb('邮箱已存在')
    } 
    body = _.pick(body, ['email', 'role', 'status', 'avatar'])
    const user = await User.findByIdAndUpdate({_id:id}, {$set: body}, {new: true, fields: '-password'})
    cb(null,user)
  } catch (err) {
    cb(err)
  }
}

/**
 * 批量删除管理员账号
 * @param {*} id 多个账号以 - 分割
 * @param {*} cb 回调
 */
module.exports.BatchDelete = async (id, cb) => {
  try {
    if (id.indexOf('-') != -1) {
     const ids = id.split('-')
     const result = []
      ids.forEach(async item => {
        await User.findByIdAndDelete(item).select('-password').then((re) => {
          result.push(re)
        })
        })
        setTimeout(() => {
          cb(null, result)
        }, 1000);
    } else {
      const user = await User.findByIdAndDelete(id)
      cb(null, user)
    }
  } catch (err) {
    cb(err, null)
  }
}

