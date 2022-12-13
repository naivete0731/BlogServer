// 引入数据库
const mongoose = require('mongoose');
// 模型规则类
const { Schema } = mongoose;
// 对象规则验证
const Joi = require('joi');

// 轮播图集合规则
const SlideSchema = new Schema({
    // 标题
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30
    },
    // 图片
    image: {
        type: String,
        required: true,
        default: null
    },
    // 链接
    link: {
         type: String,
         default: null
    },
    // 评论人
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {versionKey: false})

// 轮播图集合类
const Slide = mongoose.model('Slide', SlideSchema);

// 轮播图格式数据校验
const validateSlide = slide =>{
    
    // 定义对象验证规则
    const schema = {
        title: Joi.string().min(1).max(30).required().error(new Error('标题不符合')),
        //empty只能为字符串
        image: Joi.string().empty(),
        link: Joi.string().empty(),
        author: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('评论人非法'))
    }
    
    // 验证
    return Joi.validate(slide, schema, {
        // 检测到所有错误
        abortEarly: false,
        // 允许对象包含被忽略的未知键
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
// 导出成员对象
module.exports = {
    Slide,
    validateSlide,
    validateFindById
}