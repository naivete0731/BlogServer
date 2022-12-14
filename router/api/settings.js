const settings = require('express').Router();
const SettingServ = require('../../services/SettingsService')
const { validateSettings } = require('../../model/settings')
// 添加网站设置
settings.post('/',
  (req, res, next) => {
    const { error } = validateSettings(req.body)
    if (error) return res.sendResult(null, 400, error.message)
    next()
  },
  (req, res, next) => {
    const id = '639936863dac75a9049f09d3'
    SettingServ.UpdateSetting(id, req.body, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 201, '更新配置成功')
    })
  }
)
// 获取网站配置
settings.get('/', 
  (req, res, next) => {
    SettingServ.getSetting((err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '获取配置成功')
    })
  }
)


module.exports = settings