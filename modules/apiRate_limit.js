const RateLimit = require('express-rate-limit')
const apiLimiter = RateLimit({
    windowMs: 60 * 1000, // 1 hour
    max: 5,                // 1000 次
    delayMs: 0,               // disabled 延迟响应
    handler:  (req, res) => { // 响应格式
        // res.format({
        //     json: function () {
        //         res.status(429).json(util.error('Too many requests, please try again later.', 429, null));
        //     }
        // })
        res.status(429).sendResult(null, 429, '请求次数过多请稍后再试')
    }
})

module.exports = {
  apiLimiter
}