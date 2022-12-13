const { Comment } = require('../model/comment')
const { Post } = require('../model/post')
// 分页
const pagination = require('mongoose-sex-page')
// 工具
const _ = require('lodash')
module.exports.getAllComment = async (query, cb) => {
  try {
                   // 转为数字类型
    let pagenum = _.toNumber(query.pagenum)
    let pagesize = _.toNumber(query.pagesize)
    console.log(pagenum,pagesize,typeof pagesize)
    // console.log(page)
    // 如果页码没有传递
    if (!pagenum || !_.isNumber(pagenum)) pagenum = 1
    if (!pagesize || !_.isNumber(pagesize)) pagesize = 5
    // 查询条件
    let condition = {}
    // 分类条件
    if (query.category != undefined) {
        condition.category = query.category
    }
    // 状态条件
    if (query.state != undefined) {
        condition.state = query.state
    }
    const comment = await pagination(Comment).page(pagenum).size(pagesize).display(10).find(condition).sort('-createAt').exec()
    const commentCount = await Comment.countDocuments();
    const draftCount = await Comment.countDocuments({state: 0})
    comment.commentCount = commentCount
    comment.draftCount = draftCount
    cb(null, comment)
  } catch (err) {
    cb(err, null)
  }
}



module.exports.getPostComment = async (id, cb) => {
  try {
    // const comment = await Comment.find({post: id,state: 1}).sort('-createAt').select('-__v').lean()
    // if (!comment || comment.length === 0) return cb('文章不存在或没有评论')
//     var promises = comment.map(item => {
//       return Comment.find({
//         parentCommentId: item._id
//       }).sort('-createAt').select('-__v').lean()
//   })
//   var list = await Promise.all(promises)
// comment.forEach(item => {
//       list.forEach(code => {
//           if (code.length > 0 && item._id == code[0].parentCommentId) {
//               item.items = code
//           } else {
//               item.items = []
//           }
//       })
//   })


    // const topComment = comment.filter(item => !item.parentCommentId); // 过滤出一级评论
    // const promises = topComment.map(item => { // 为每条一级评论创建查询子评论的Promise
    // return Comment.find({
    // parentCommentId: item._id
    // }).sort('-createAt').select('-__v').lean()
    // });
    // const childrenCommentList = await Promise.all(promises); // 查询所有子评论，并获得所有子评论的列表
    // topComment.forEach((item, i) => { // 遍历每条一级评论，将它的子评论放到items中
    // item.items = childrenCommentList[i];
    // });
    // cb(null, topComment); // 返回一级评论和它的子评论

//     查询文章下的所有一级评论
//   const comment = await Comment.find({post: id,state: 1}).sort('-createAt').select('-__v').lean()
//   if (!comment || comment.length === 0) return cb('文章不存在或没有评论')

//   // 遍历一级评论，查询二级评论
//   for (let i = 0; i < comment.length; i++) {
//     // 查询二级评论
//     const secondLevelComment = await Comment.find({parentCommentId: comment[i]._id}).sort('-createAt').select('-__v').lean()
//     if (secondLevelComment && secondLevelComment.length > 0) {
//       // 将二级评论添加到一级评论的 items 属性中
//       comment[i].items = secondLevelComment

//       // 遍历二级评论，查询三级评论
//       for (let j = 0; j < secondLevelComment.length; j++) {
//         // 查询三级评论
//         const thirdLevelComment = await Comment.find({parentCommentId: secondLevelComment[j]._id}).sort('-createAt').select('-__v').lean()
//         if (thirdLevelComment && thirdLevelComment.length > 0) {
// // 将三级评论添加到二级评论的 items 属性中
// secondLevelComment[j].items = thirdLevelComment
// }
// }
// }
// }
// cb(null, comment)


// const comment = await Comment.find({post: id,state: 1}).sort('-createAt').select('-__v').lean()
//   if (!comment || comment.length === 0) return cb('文章不存在或没有评论')

//   const topComment = comment.filter(item => !item.parentCommentId); // 过滤出一级评论
//   const promises = topComment.map(item => { // 为每条一级评论创建查询子评论的Promise
//     return Comment.find({
//       parentCommentId: item._id
//     }).sort('-createAt').select('-__v').lean()
//   });
//   const childrenCommentList = await Promise.all(promises); // 查询所有子评论，并获得所有子评论的列表
//   topComment.forEach((item, i) => { // 遍历每条一级评论，将它的子评论放到items中
//     item.items = childrenCommentList[i];
//   });
//   cb(null, topComment); // 返回一级评论和它的子评论


const comment = await Comment.find({post: id,state: 1}).sort('-createAt').select('-__v').lean()
if (!comment || comment.length === 0) return cb('文章不存在或没有评论')
const Count = await Comment.countDocuments({post: id, state: 1})
// 过滤出一级评论
const topComment = comment.filter(item => !item.parentCommentId);

// 为每条一级评论创建查询二级评论的Promise
const firstLevelPromises = topComment.map(item => {
  return Comment.find({parentCommentId: item._id}).sort('-createAt').select('-__v').lean()
});

// 查询所有二级评论，并获得所有二级评论的列表
const firstLevelCommentList = await Promise.all(firstLevelPromises);

// 为每条二级评论创建查询三级评论的Promise
const secondLevelPromises = firstLevelCommentList.flat().map(item => {
  return Comment.find({parentCommentId: item._id}).sort('-createAt').select('-__v').lean()
});

// 查询所有三级评论，并获得所有三级评论的列表
const secondLevelCommentList = await Promise.all(secondLevelPromises);

// 遍历每条一级评论，将它的二级评论放到items属性中
topComment.forEach((item, i) => {
  item.items = firstLevelCommentList[i];
});

// 遍历每条二级评论，将它的三级评论放到items属性中
firstLevelCommentList.flat().forEach((item, i) => {
  item.items = secondLevelCommentList[i];
});

topComment.total = Count
cb(null, topComment); // 返回一级评论和它的子评论


  } catch (err) {
    console.log(err)
    cb(err, null)
  }
}



module.exports.AddComment = async (id, body, cb) => {
  try {
     // 创建评论
     body.post = id
     body.state = 1
     console.log(body);
     const comment = new Comment(body);
     // 保存评论
     await comment.save();
     // 找到被评论的文章
     let post = await Post.findOne({_id: id});
     // 更新评论数量
     post.meta.comments = post.meta.comments + 1
     // 保存文章信息
     await post.save()
     cb(null, comment)
  } catch (err) {
    cb(err, null)
  }
}



// module.exports.DeleteComment = async (ids, cb) => {
//   try {
//     // 检查是否为批量删除
//     if (Array.isArray(ids)) {
//       // 循环遍历删除每个评论
//       for (let id of ids) {
//         let result = await Comment.findOneAndRemove({_id: id});
//         if (!result) {
//           return cb(new Error('评论不存在'));
//         }
//         // 查找被评论的文章
//         let post = await Post.findOne({_id: result.post});
//         // 更新评论数量
//         post.meta.comments = post.meta.comments - 1;
//         // 保存文章信息
//         await post.save();
//       }
//     } else {
//       // 只删除一个评论
//       const result = await Comment.findOneAndRemove({_id: ids});
//       if (!result) {
//         return cb(new Error('评论不存在'));
//       }
//       // 查找被评论的文章
//       let post = await Post.findOne({_id: result.post});
//       // 更新评论数量
//       post.meta.comments = post.meta.comments - 1;
//       // 保存文章信息
//       await post.save();
//     }
//     cb(null);
//   } catch (err) {
//     cb(err);
//   }
// }

module.exports.DeleteComment = async (id, cb) => {
  try {
    // 定义递归函数，用来删除子评论
async function deleteChildComment(commentId) {
  // 查找所有子评论
  const childComments = await Comment.find({parentCommentId: commentId});
  // 删除所有子评论
  for (const comment of childComments) {
    await Comment.deleteOne({_id: comment._id});
    // 对于每个子评论，再递归删除它的子评论
    deleteChildComment(comment._id);
  }
}
    if (id.indexOf('-') != -1) {
      const ids = id.split('-');
      for (let commentId of ids) {
        let comment = await Comment.findOne({_id: commentId});
        if (!comment.parentCommentId) {
          
          // 查找一级评论
          const comment = await Comment.findOne({_id: commentId});
                  
          // 删除一级评论
          await Comment.deleteOne({_id: comment._id});
                  
          // 递归删除子评论
          deleteChildComment(comment._id);
                  
          // 更新文章评论数量
          const post = await Post.findOne({_id: comment.post});
          post.meta.comments -= 1;
          await post.save();
        } else {
         
          const comment = await Comment.findOne({_id: commentId});

          // 删除一级评论
          await Comment.deleteOne({_id: comment._id});

          // 递归删除子评论
          deleteChildComment(comment._id);

          // 更新文章评论数量
          const post = await Post.findOne({_id: comment.post});
          post.meta.comments -= 1;
          await post.save();
        }
      }
      cb(null, {comment: '删除成功'})
    } else {
     

      // 查找一级评论
      const comment = await Comment.findOne({_id: id});
          
      // 删除一级评论
      await Comment.deleteOne({_id: comment._id});
          
      // 递归删除子评论
      deleteChildComment(comment._id);
          
      // 更新文章评论数量
      const post = await Post.findOne({_id: comment.post});
      post.meta.comments -= 1;
      await post.save();
      cb(null, comment)
    }
  
  
} catch (err) {
  cb(err)
}
}



module.exports.BatchUpdateCommentStatus = async (id, cb) => {
  try {
    if (id.indexOf('-') != -1) {
      const ids = id.split('-');
    for (let id of ids) {
      let comment = await Comment.findOne({_id: id});
      comment.state = comment.state == 0 ? 1 : 0;
      await comment.save();
    } 
    cb(null, ids);
  } else {
    let comment = await Comment.findOne({_id: id});
    comment.state = comment.state == 0 ? 1 : 0;
      await comment.save();
      cb(null, id);
  }
  } catch (err) {
    cb(err);
  }
}



module.exports.GetLatestComments = async (num, cb) => {
  try {
    // 获取最新的 num 条评论
    const comments = await Comment.find({ state: 1 }).sort({ createdAt: -1 }).limit(num);
    cb(null, comments);
  } catch (err) {
    cb(err, null);
  }
}


module.exports.getAllCommentsCount = async (cb) => {
  try {
  // 查询所有文章数量
      const commentCount = await Comment.countDocuments();
      const draftCount = await Comment.countDocuments({state: 0})
      // 响应
    cb(null,{commentCount, draftCount})
  } catch(err) {
      cb(err, null)
  }
}

module.exports.getIdCommentsCount = async (id, cb) => {
  try {
  // 查询所有文章数量
      const Count = await Comment.countDocuments({_id: id, state: 1})
      // 响应
    cb(null,Count)
  } catch(err) {
      cb(err, null)
  }
}

