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


module.exports.exists = async (username, cb) => {
  try {
    const user = await User.findOne({username}).select('-password')
    cb(null, user)
  } catch (err) {
    cb(err, null)
  }
}