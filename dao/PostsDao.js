const { Post } = require('../model/post')
const { Comment } = require('../model/comment')
const { Category } = require('../model/category')
// 分页
const pagination = require('mongoose-sex-page');
// 随机
require('mongoose-query-random');
// 工具
const _ = require('lodash');
const { cond } = require('lodash');
const { unlink } = require('../modules/unlink')

/**
 * // 添加文章信息
 * @param {*} id 用户id
 * @param {*} body 文章内容
 * @param {*} cb 回调
 */
module.exports.addPost = async (id, body, cb) => {
  try {
    const category = await Category.findById(body.category)
    console.log(category)
    if (category === null) return cb('分类id不存在')
    body.author = id
    const post = new Post(body)
    // 保存文章
    await post.save()
    cb(null, post)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 获取所有文章
 * @param {*} query  {pagenum: 当前页，pagesize: 显示的数据条数}
 * @param {*} cb 回调
 */
module.exports.getPosts = async (query, cb) => {
  try {
                   // 转为数字类型
    let pagenum = _.toNumber(query.pagenum)
    let pagesize = _.toNumber(query.pagesize)
    console.log(pagenum,pagesize,typeof pagesize);
    // console.log(page);
    // 如果页码没有传递
    if (!pagenum || !_.isNumber(pagenum)) pagenum = 1
    if (!pagesize || !_.isNumber(pagesize)) pagesize = 5
    // 查询条件
    let condition = {}
    // 分类条件
    console.log(query.category);
    if (query.category != undefined && query.category !== '') {
        condition.category = query.category;
    }
    // 状态条件
    if (query.state != undefined) {
        condition.state = query.state;
    }
    const post = await pagination(Post).page(pagenum).size(pagesize).display(10).find(condition).populate('author', '-password').populate('category').select('-content -meta').sort('-updateAt').exec();
    cb(null, post)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 根据文章id获取文章信息
 * @param {*} id 文章id
 * @param {*} cb 回调
 */
module.exports.findPost = async (id, cb) => {
  try {
    const post = await Post.findById(id).populate('author', '-password').populate('category').select('-meta')
    if (post === null) return cb('ID不存在', null)
    cb(null, post)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 获取文章总数
 * @param {*} cb 回调
 */
module.exports.countPosts = async (cb) => {
  try {
    const postCount = await Post.countDocuments()
    cb(null, postCount)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 获取最新发布文章
 * @param {*} cb 回调
 */
module.exports.lasted = async (cb) => {
  try {
    const posts = await Post.find({state: 1}).sort('-createAt').populate('author', '-password').populate('category').limit(5);
    cb(null, posts)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 获取热门推荐
 * @param {*} cb 回调
 */
module.exports.recommend = async (cb) => {
  try {
    const posts = await Post.find({state: 1}).select('-content').limit(4).sort('-meta.comments')
    cb(null, posts)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 获取随机推荐
 * @param {*} cb 回调
 */
module.exports.random = async (cb) => {
  try {
    Post.find({state: 1}).random(5, true, (err, docs) => {
      cb(null, docs)
  })
  } catch (err) {
    cb(err, null)
  }
}

/**
 *  文章点赞
 * @param {*} id 文章id
 * @param {*} cb 回调
 */
module.exports.fabulous = async (id, cb) => {
  try {
     // 获取文章id
     // 查询文章信息
     const post = await Post.findOne({_id: id}).select('meta')
    if (post === null) return cb('文章不存在')
     // 赞数量+1
     post.meta.likes = post.meta.likes + 1;
     // 保存
     await post.save();
     // 响应
    cb(null, post)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 文章搜索
 * @param {*} q 搜索内容
 * @param {*} cb 回调
 */
module.exports.search = async (q, cb) => {
  try {
    // 获取用户输入的额关键字
    const key = q;
    // 如果用户输入了关键字
    if(key.trim().length > 0) {
        const regex = new RegExp(escapeRegex(key), 'gi');
        // 根据关键字查询文章
        const posts = await Post.find({title: regex}).populate('author', '-password').populate('category');
        posts.total = posts.length
        if (posts.total === 0) return cb('没有找到你想要的内容')
        // 响应
        cb(null, posts)
    } else {
        cb('请输入搜索关键字')
    }

    function escapeRegex(text) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 根据分类获取文章列表 
 * @param {*} id 分类id
 * @param {*} cb 回调
 */
module.exports.category = async (id, state, cb) => {
  try {
    // 查询用户信息
    const posts = await Post.find({$and:[{category: id},{state:state}]}).populate('author', '-password').populate('category');
    if (posts.length === 0) return cb('没找找到此分类的文章')
    posts.total = posts.length
    console.log(posts);
    cb(null, posts)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 根据id修改文章
 * @param {*} id 文章id
 * @param {*} body 文章内容
 * @param {*} cb 回调
 */
module.exports.updatePost = async (id, body, cb) => {
  try {
    const thumbnail = await Post.findById(id)
    console.log(body.thumbnail);
    if (thumbnail.thumbnail !== null) {
       unlink(thumbnail.thumbnail)
      if (body.thumbnail.trim() === '') {
        console.log('为空');
        return cb('请上传头像')
      }
    }
   
    const post = await Post.findByIdAndUpdate({_id:id}, {$set: body}, {new: true})
    if (post === null) return cb('修改失败')
    cb(null, post)
  } catch (err) {
    cb(err, null)
  }
}

/**
 * 批量删除文章
 * @param {*} id 删除的文章id 多个以-分隔
 * @param {*} cb 回调
 */
module.exports.deletePosts = async (id, cb) => {
  try {
    if (id.indexOf('-') != -1) {
      const ids = id.split('-')
      const result = []
       ids.forEach(async item => {
         await Post.findByIdAndDelete(item).then(async (re) => {
          if (re.thumbnail !== null) {
            unlink(re.thumbnail)
             }
             await Comment.deleteMany({post: re._id})
           result.push(re)
         })
         })
         setTimeout(() => {
           cb(null, result)
         }, 1000);
     } else {
       const post = await Post.findByIdAndDelete(id)
       if (post.thumbnail !== null) {
        unlink(post.thumbnail)
         }
         await Comment.deleteMany({post: id})
       cb(null, post)
     }
  } catch (err) {
    cb(err, null)
  }
}