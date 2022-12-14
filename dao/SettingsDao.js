const { Setting } = require('../model/settings')
const { unlink } = require('../modules/unlink')


module.exports.UpdateSetting = async (id, body, cb) => {
  try {
    const settings = await Setting.findByIdAndUpdate({_id:id}, {$set: body}, {new: true})
    if (settings === null) return cb('修改失败')
    if (settings.logo || settings.logo !== body.logo) {
      // 删除
      await unlink(settings.logo)
  }
    cb(null, settings)
  } catch (err) {
    cb(err, null)
  }
}

module.exports.getSetting = async (cb) => {
  try {
    let slides = await Setting.find()
    cb(null, slides)
  } catch (err) {
    cb(err, null)
  }
}