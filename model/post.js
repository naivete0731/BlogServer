//引入数据库模块
const mongoose = require('mongoose');
//引入Joi验证模块
const Joi = require('joi');
// 模型规则类
const { Schema } = mongoose;

//文章模型规则
const PostSchema = new Schema({
    // 标题
    title: {
        type: String,
        minlength: 2,
        maxlength: 100,
        required: [true, '请输入文章标题']
    },
    // 作者 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // 状态
    state: {
        type: Number,
        // 0 草稿 1 发布
        default: 0
    },
    // 创建时间
    createAt: {
        type: Date,
        default: Date.now
    },
    // 修改时间
    updateAt: {
        type: Date,
        default: Date.now
    },
    // 内容
    content: {
        type: String,
        minlength:1,
        maxlength:1000,
        default: null
    },
    // 缩略图
    thumbnail: {
        type: String,
        default: null
    },
    // 所属分类
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, '文章不存在']
    },
    // 统计
    meta: {
        // 看过数量
        views: { type: Number, default: 0 },
        //喜欢数量
        likes: { type: Number, default: 0 },
        //评论数量
        comments: { type: Number, default: 0 }
    }
}, {versionKey: false})

// 创建文章规则
const Post = mongoose.model('Post', PostSchema);
// 时间更新
PostSchema.pre('findOneAndUpdate', function(next) {
	this.findOneAndUpdate({}, { updateAt: Date.now() })
	next();
});
// 文章格式校验
const validatePost = post => {
    // 定义对象验证规则
    const schema = {
        title: Joi.string().min(2).max(100).required().error(new Error('文章标题不能小于2个字')),
        state: Joi.number().valid([0, 1]).default(0, 'draft').error(new Error('文章状态非法')),
                     // any值任意类型  empty只能为字符串
        thumbnail: Joi.any().empty(),
        content: Joi.string().min(1).max(1000).required().error(new Error('文章内容不能为空')),
        category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('分类id格式非法'))
    }

    // 验证
    return Joi.validate(post, schema, {
        // 检测到所有错误
        abortEarly: false,
        // 允许对象包含被忽略的位置键
        allowUnknown: true
    })
}
const validateFindById = user => {
  const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id非法'))
        // 验证
  return Joi.validate(user, schema, {
            // 允许对象包含被忽略的未知键
            allowUnknown: true
  });
 
}

// const validateSearch = key => {
//     const schema = Joi.string().required().regex(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&").error(new Error('用户id非法'))
//         // 验证
//      return Joi.validate(user, schema, {
//             // 允许对象包含被忽略的未知键
//             allowUnknown: true
//   });
// }
// for (let i = 0; i < 20; i++) {
//     Post.create({
//         title: '新疆有西八',
//         author: '637757f7377fcae3f1c9ab37',
//         state: 0,
//         content: '新疆有西八新疆有西八新疆有西八',
//         category: '6381c0168f9c9d28182f3c1d'
//     }).then(() => console.log('文章创建成功'))
// }
// 导出模块成员
module.exports = {
    Post,
    validatePost,
    validateFindById
}