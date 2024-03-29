// 引入数据库
const mongoose = require('mongoose');
// 模型规则类
const { Schema } = mongoose;
// 对象规则验证
const Joi = require('joi');

// 配置集合规则
const SettingSchema = new Schema({
    //网站logo
    logo: {
        type: String,
        default: null
    },
    // 网站名称
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    keyword: {
        type: String,
        default: null,
        maxlength: 50
    },
    describe: {
        type: String,
        default: null,
        maxlength: 100
    },
    // 是否开启评论功能
    comment: {
        type: Boolean,
        required: true,
        default: false
    },
    // 评论必须经过人工审核
    review: {
        type: Boolean,
        required: true,
        default: false
    },
    register: {
        type: Boolean,
        required: true,
        default: false
    }
}, {versionKey: false})

// 配置集合类
const Setting = mongoose.model('Setting', SettingSchema);
// Setting.create({
//     logo: 'public\\uploads\\fdbb52d9b346ab6d43af19c0ba328ede.jpg',
//     title: '只因伐木累',
//     keyword: '坤坤，只因你太美',
//     describe: '我们是只因大家庭',
//     comment: true,
//     review: true,
//     register: true
// })
// 配置数据格式校验
const validateSettings = settings => {
    // 定义对象严重规则
    const schema = {
        title: Joi.string().min(1).max(20).required().error(new Error('网站标题不能小于1个字符')),
        logo: Joi.string().empty()
    }
    // 验证
    return Joi.validate(settings, schema, {
        // 检测到所有错误
        abortEarly: false,
        // 允许对象包含被忽略的未知键
        allowUnknown: true
    })
}

// 导出成员对象
module.exports = {
    Setting,
    validateSettings
}