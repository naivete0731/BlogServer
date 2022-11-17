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
  console.log(obj)
  try {
    const selt = await bcrypt.genSalt(10)
    obj.password = await bcrypt.hash(obj.password, selt)
    console.log(obj.password);
    let user = new User(obj)
    await user.save()
    user = _.pick(user, ['_id','email','username','role','avatar','createTime','status'])
    cb(null, user)
  } catch (err) {
    cb(err,null)
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
    cb(null, user, email)
  } catch (err) {
    cb(err, null, null)
  }
} 

module.exports.BatchDelete = async (id, cb) => {
  try {
    if (id.indexOf('-') != -1) {
     ForEach(id)
      console.log(result);
      console.log(3);
      await cb(null, result)
    } else {
      const user = await User.findByIdAndDelete(id)
      cb(null, user)
    }
  } catch (err) {
    cb(err, null)
  }
}

module.exports.ForEach = item => {
      const ids = item.split('-')
      let result = []
      ids.forEach(async item => {
        const user = await User.findByIdAndDelete(item)
        result.push(user)
      })
}