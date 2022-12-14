const { Category } = require('../model/category')
const { Post } = require('../model/post')
/**
 * 获取所有分类
 * @param {*} conditions 查询条件
 * @param {*} cb 回调
 */
 module.exports.getAllCategorys = async (conditions, cb) => {
  try {
    const category = await Category.find().sort('creaetTime')
    cb(null, category)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 添加分类
 * @param {*} body {title: 标题, className: 图标} 
 * @param {*} cb 回调
 */
module.exports.addCategory = async (body, cb) => {
  try {
    const category = new Category(body)
    await category.save()
    cb(null, category)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 批量删除分类
 * @param {*} id id  多个id则用   - 分割
 * @param {*} cb 回调
 */
module.exports.deleteCategory = async (id, cb) => {
  try {
        if (id.indexOf('-') != -1) {
         const ids = id.split('-')
         const result = []
          ids.forEach(async item => {
            await Category.findByIdAndDelete(item).select('-password').then(async (re) => {
              result.push(re)
              await Post.deleteMany({category: re._id})
            })
            })
            setTimeout(() => {
              cb(null, result)
            }, 1000);
        } else {
          const user = await Category.findByIdAndDelete(id)
          await Post.deleteMany({category: id})
          cb(null, user)
        }
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 获取分类总数
 * @param {*} cb 回调
 */
module.exports.countCategory = async (cb) => {
  try {
    const categoryCount = await Category.countDocuments();
    cb(null, categoryCount)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 修改分类信息
 * @param {*} id 修改的id
 * @param {*} body {title：标题, className: 图标}
 * @param {*} cb 回调
 * @returns 
 */
module.exports.updateCategory = async (id, body, cb) => {
  try {
    const title = await Category.findOne({title: body.title}).select('title')
    const isTitle = await Category.findOne({_id: id}).select('title')
    // 判断邮箱是否改变 没有改变则放行，改变需要判断新邮箱是否存在
    if (isTitle.title !== body.title) {
      if (title !== null) {
        return cb('标题已存在')
      }
    }
    const category = await Category.findByIdAndUpdate({_id:id}, {$set: body}, {new: true})
    cb(null, category)
  } catch (err) {
    console.log(err);
    cb(err, null)
  }
}

/**
 * 根据ID查询分类信息
 * @param {*} id id
 * @param {*} cb 回调
 * @returns 
 */
module.exports.findCategory = async (id, cb) => {
  try {
    const category = await Category.findById(id).select('-password')
    if (category === null) return cb('ID不存在', null)
    cb(null, category)
  } catch (err) {
    cb(err, null)
  }
}