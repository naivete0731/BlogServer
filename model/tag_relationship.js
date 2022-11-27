//引入数据库模块
const mongoose = require('mongoose');
//引入Joi验证模块
const Joi = require('joi');
// 模型规则类
const { Schema } = mongoose;

//文章模型规则
const TagRealtionSchema = new Schema({
    // 标题
    pid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    tid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
      required: true
    },
    createTime: {
      type: Date,
      default: Date.now
    }
}, {versionKey: false})

// 创建文章规则
const TagRealtion = mongoose.model('TagRealtion', TagRealtionSchema);

// 文章格式校验
const validateTagRealtion = tag => {
    // 定义对象验证规则
    const schema = {
      pid: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id非法')),
      tid: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id非法'))
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
  // TagRealtion.create({
  //      pid: '6381dcaff290e071b1faaf3c',
  //      tid: '6381deeb2bf1daae30fee36e'
  //   }).then(() => console.log('文章创建成功'))
// }
// 导出模块成员
module.exports = {
  TagRealtion,
    validateTagRealtion
}