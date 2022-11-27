//引入数据库模块
const mongoose = require('mongoose');
//引入Joi验证模块
const Joi = require('joi');
// 模型规则类
const { Schema } = mongoose;

//文章模型规则
const TagSchema = new Schema({
    // 标题
    name: {
        type: String,
        minlength: 2,
        maxlength: 100,
        required: [true, '请输入标签名']
    }
}, {versionKey: false})

// 创建文章规则
const Tag = mongoose.model('Tag', TagSchema);

// 文章格式校验
const validateTag = tag => {
    // 定义对象验证规则
    const schema = {
        title: Joi.string().min(2).max(100).required().error(new Error('标签不能小于2个字'))
    }

    // 验证
    return Joi.validate(tag, schema, {
        // 检测到所有错误
        abortEarly: false,
        // 允许对象包含被忽略的位置键
        allowUnknown: true
    })
}

// for (let i = 0; i < 20; i++) {
    Tag.create({
        name: '生活'
    }).then(() => console.log('文章创建成功'))
// }
// 导出模块成员
module.exports = {
    Tag,
    validateTag
}