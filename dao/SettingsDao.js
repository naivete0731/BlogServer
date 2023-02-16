const { Setting } = require('../model/settings')
const { unlink } = require('../modules/unlink')


module.exports.UpdateSetting = async (id, body, cb) => {
  try {
    const setting = await Setting.findById(id)

    if (setting.logo !== body.logo) {
      // 删除
      await unlink(setting.logo)
  }
  const settings = await Setting.findByIdAndUpdate({_id:id}, {$set: body}, {new: true})
  console.log(settings);
  if (settings === null) return cb('修改失败')

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