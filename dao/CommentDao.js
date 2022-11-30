const { Comment } = require('../model/comment')
// 分页
const pagination = require('mongoose-sex-page');
// 工具
const _ = require('lodash');
module.exports.getAllComment = async (query, cb) => {
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
    if (query.category != undefined) {
        condition.category = query.category;
    }
    // 状态条件
    if (query.state != undefined) {
        condition.state = query.state;
    }
    const post = await pagination(Comment).page(pagenum).size(pagesize).display(10).find(condition).populate('parentCommentId').sort('-createAt').exec();
    cb(null, post)
  } catch (err) {
    cb(err, null)
  }
}