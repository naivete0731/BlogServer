const { Menus } = require('../model/menus')


/**
 * 获取所有分类
 * @param {*} conditions 查询条件
 * @param {*} cb 回调
 */
module.exports.getMenus = async (cb) => {
  try {
      const comment = await Menus.find().select('-__v').lean()
      if (!comment || comment.length === 0) return cb('侧边栏不存在或没有')
      // 过滤出一级评论
      const topComment = comment.filter(item => !item.parentMenuId);
        
      // 为每条一级评论创建查询二级评论的Promise
      const firstLevelPromises = topComment.map(item => {
        return Menus.find({parentMenuId: item._id}).select('-__v').lean()
      });
      
      // 查询所有二级评论，并获得所有二级评论的列表
      const firstLevelCommentList = await Promise.all(firstLevelPromises);
      
      
      
      // 遍历每条一级评论，将它的二级评论放到items属性中
      topComment.forEach((item, i) => {
        item.items = firstLevelCommentList[i];
      });
      
      cb(null, topComment); // 返回一级评论和它的子评论

  } catch (err) {
    cb(err, null)
  }
}


/**
 * 添加分类
 * @param {*} body {title: 标题, className: 图标} 
 * @param {*} cb 回调
 */
// module.exports.addMenu = async (body, cb) => {
//   try {
//     if (body.parentMenuId.trim() !== '') {
//       const count = await Menus.countDocuments({_id: body.parentMenuId})
//       const parent = await Menus.findById(body.parentMenuId)
//       parent.indexPath = count
//       await parent.save()
//     }
//     console.log(body.parentMenuId);
//     const menu = new Menus(body)
//     await menu.save()
//     cb(null, menu)
//   } catch (err) {
//     cb(err, null)
//   }
// }

module.exports.addMenu = async (body, cb) => {
  try {
    // 如果父级菜单为空，则直接保存新菜单
    if (body.parentMenuId.trim() === '') {
      const menu = new Menus(body)
      await menu.save()
      cb(null, menu)
      return
    }

    // 查找父级菜单
    const parent = await Menus.findById(body.parentMenuId)
    if (!parent) {
      cb(new Error('父级菜单不存在'), null)
      return
    }

    // 计算父级菜单的子菜单数量
    let count = await Menus.countDocuments({parentMenuId: body.parentMenuId})
    count++
    parent.indexPath = count 

    // 保存新菜单和父级菜单
    await parent.save()
    const menu = new Menus(body)
    await menu.save()
    cb(null, menu)
  } catch (err) {
    cb(err, null)
  }
}


/**
 * 批量删除分类
 * @param {*} id id  多个id则用   - 分割
 * @param {*} cb 回调
 */
module.exports.DeleteComment = async (id, cb) => {
  try {
    // 定义递归函数，用来删除子评论
async function deleteChildComment(commentId) {
  // 查找所有子评论
  const childComments = await Menus.find({parentMenuId: commentId});
  // 删除所有子评论
  for (const comment of childComments) {
    await Menus.deleteOne({_id: comment._id});
    // 对于每个子评论，再递归删除它的子评论
    deleteChildComment(comment._id);
  }
}
    if (id.indexOf('-') != -1) {
      const ids = id.split('-');
      for (let commentId of ids) {
        let comment = await Menus.findOne({_id: commentId});
        if (!comment.parentMenuId) {
          
          // 查找一级评论
          const comment = await Menus.findOne({_id: commentId});
                  
          // 删除一级评论
          await Menus.deleteOne({_id: comment._id});
                  
          // 递归删除子评论
          deleteChildComment(comment._id);
                  
          // 更新文章评论数量
          const post = await Post.findOne({_id: comment.post});
          post.meta.comments -= 1;
          await post.save();
        } else {
         
          const comment = await Menus.findOne({_id: commentId});

          // 删除一级评论
          await Menus.deleteOne({_id: comment._id});

          // 递归删除子评论
          deleteChildComment(comment._id);
        }
      }
      cb(null, {comment: '删除成功'})
    } else {
      // 查找一级评论
      const comment = await Menus.findOne({_id: id});
          
      // 删除一级评论
      await Menus.deleteOne({_id: comment._id});
          
      // 递归删除子评论
      deleteChildComment(comment._id);
      cb(null, comment)
    }
  
  
} catch (err) {
  cb(err)
}
}

/**
 * 根据文章id获取文章信息
 * @param {*} id 文章id
 * @param {*} cb 回调
 */
module.exports.findMenu = async (id, cb) => {
  try {
    const menu = await Menus.findById(id)
    if (menu === null) return cb('ID不存在', null)
    cb(null, menu)
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
module.exports.updateMenu = async (id, body, cb) => {
  try {
    const menu = await Menus.findByIdAndUpdate({_id:id}, {$set: body}, {new: true})
    if (menu === null) return cb('修改失败')
    cb(null, menu)
  } catch (err) {
    cb(err, null)
  }
}