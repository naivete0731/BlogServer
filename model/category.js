//引入数据库
const mongoose = require('mongoose');
//模型规则类
const { Schema } = mongoose;
//对象规则验证
const Joi = require('joi');
//文章模型规则
const CategorySchema = new Schema({
    //分类名称
    title: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true,
        // 唯一
        unique: true
    },
    //分类类名
    className: {
        type: String,
        default: null
    },
    //创建时间
    createAt: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false})

// 创建分类集合
const Category = mongoose.model('Category', CategorySchema);


// 违章分类格式验证(路由级别)
const validateCategory = category => {
    //定义对象验证规则
    const schema = {
        title: Joi.string().min(2).max(30).required().error(new Error('分类不符合规则')),
        className: Joi.string().required().error(new Error('请填写分类图标类名')),
        createAt: Joi.date().default(Date.now,'created time')
    }
    // 验证
    return Joi.validate(category, schema, {
        // 检测到所有错误
        abortEarly: false,
        // 允许对象包含被忽略的未知键
        allowUnknown: true
    })
}
const validateFindById = category => {
  const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id非法'))
        // 验证
  return Joi.validate(category, schema, {
            // 允许对象包含被忽略的未知键
            allowUnknown: true
  });
 
}

// 导出模块成员
module.exports = {
    Category,
    validateCategory,
    validateFindById
}