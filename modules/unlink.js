// 文件模块
const path = require('path')
const fs = require('fs');
// 方法改进
const { promisify } = require('util')
// 删除文件
const unlink = promisify(fs.unlink);

module.exports.unlink = async (avatar) => {
  try {
    if (avatar) {
    // 删除缩略图
    await unlink(path.join(__dirname, '../', avatar))
  } 
  
} catch (err) {
  return err
}
}