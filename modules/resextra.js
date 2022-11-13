// 统一返回结果
module.exports = (req, res, next) => {
  res.sendResult = (data, code, message) => {
    let fmt = req.query.fmt ? req.query.fmt : "rest"
    if (fmt == "rest") {
      res.json({
        "status": code,
        "data": data,
        "message": message
      })
    }
  }
  next()
}