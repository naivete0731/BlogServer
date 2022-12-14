const SettingDao = require('../dao/SettingsDao')

module.exports.UpdateSetting = (id, body, cb) => {
  SettingDao.UpdateSetting(id, body, (err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}

module.exports.getSetting = (cb) => {
  SettingDao.getSetting((err, result) => {
    if (err) return cb(err, null)
    cb(null, result)
  })
}