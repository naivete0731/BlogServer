const { Tag } = require('../model/tag')
const { TagRealtion } = require('../model/tag_relationship')
const { Post } = require('../model/post')

/**
 * 获取所有便签
 * @param {*} cb 回调
 */
module.exports.getAllTag = async (cb) => {
  try {
    const tag = await Tag.find().sort('creaetTime')
    cb(null, tag)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 添加标签
 * @param {*} name 标签名
 * @param {*} cb 回调
 */
module.exports.addTag = async (name, cb) => {
  try {
    const Name = await Tag.findOne({name})
    if (Name !== null) return cb('标签已存在')
    const tag = new Tag({name})
    // 保存文章
    await tag.save()
    cb(null, tag)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 删除标签
 * @param {*} id 标签id 
 * @param {*} cb 回调
 */
module.exports.delTag = async (id, cb) => {
  try {
    const tag = await Tag.findByIdAndDelete(id)
    cb(null, tag)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 添加标签链接
 * @param {*} pid 文章id
 * @param {*} tid 标签id
 * @param {*} cb 回调
 */
module.exports.addRelation = async (pid, tid, cb) => {
  try {
    const post = await TagRealtion.find({pid}).populate('pid').populate('tid')
    const ispost = await Post.findById(pid)
    const tag = await Tag.findById(tid)
    if (ispost === null) return cb('文章id不存在')
    if (tag === null) return cb('标签id不存在')
    let iscomm = false
    post.forEach(item => {
      if (item.tid.id === tid) {
        iscomm=true
      } 
    })
    if (iscomm) return cb('文章标签已存在')
    console.log(iscomm);
    const tagRealtion = new TagRealtion({pid,tid})  
    await tagRealtion.save()
    cb(null, tagRealtion)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 删除标签链接
 * @param {*} id 标签链接id
 * @param {*} cb 回调
 */
module.exports.deleteRelation = async (id, cb) => {
  try {
    const tagRealtion = await TagRealtion.findByIdAndDelete(id)
    if (tagRealtion === null) return cb('链接文章标签id不存在')
    cb(null, tagRealtion)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 获取所有标签链接
 * @param {*} cb 回调
 */
module.exports.getAllRelation= async (cb) => {
  try {
    const tagRealtion = await TagRealtion.find().sort('creaetTime')
    cb(null, tagRealtion)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 根据id获取标签链接
 * @param {*} id 标签链接id
 * @param {*} cb 回调
 */
module.exports.getPostRelation = async (id, cb) => {
  try {
    const ispost = await Post.findById(id)
    if (ispost === null) return cb('文章id不存在')
    const postRealtion = await TagRealtion.find({ pid: id }).populate('tid')
    if (postRealtion === null) return cb('此文章没有标签')
    cb(null, postRealtion)
  } catch (err) {
    cb(err, null)
  }
}